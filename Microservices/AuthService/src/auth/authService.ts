/*
#######################################################################
#
# Copyright (C) 2022-2025 David C. Harrison. All right reserved.
#
# You may not use, distribute, publish, or modify this code without
# the express written permission of the copyright holder.
#
#######################################################################
*/
import * as jwt from "jsonwebtoken"
import * as db from './db'
import { midt, UUID, SessionUser } from '../types'
import { Credentials, Authenticated, NewUser, Driver } from '.'
import { OAuth2Client } from 'google-auth-library';

// https://chat.deepseek.com/a/chat/s/b44e480a-f720-4b4e-b923-ac03aa7f7fc6
const JWT_SECRET = process.env.MASTER_SECRET
const JWT_OPTIONS: jwt.SignOptions = {
  expiresIn: "30m",
  algorithm: "HS256"
};
export function generateToken(userId: UUID, text = ''): midt {
  return jwt.sign({ id: userId }, JWT_SECRET + text, JWT_OPTIONS);
}

export class AuthService {
  public async signUp(signUpDetails: NewUser): Promise<Authenticated | undefined> {
    const newUser = await db.createNewUser(signUpDetails);
    if (newUser) {
      return { name: newUser.name, email: newUser.email, accessToken: generateToken(newUser.id) };
    } else {
      return undefined
    }
  }
  public async login(credentials: Credentials): Promise<Authenticated | undefined> {
    try {
      const user = await db.verifyLogin(credentials);
      if (user) {
        return { name: user.name, email: user.email, accessToken: generateToken(user.id) };
      } else {
        return undefined
      }
    }
    catch (err) {
      console.log("login db error:", err);
      return undefined;
    }
  }

  public async loginWithGoogle(token: string): Promise<Authenticated | undefined> {
    const client = new OAuth2Client();
    try {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID, // Optional but recommended
      });

      const payload = ticket.getPayload();
      if (!payload || !payload.email || !payload.name) {
        return undefined;
      }

      // Check if the user exists, or create them
      let user = await db.getUserByEmail(payload.email);
      if (!user) {
        user = await db.createNewUser({
          name: payload.name,
          email: payload.email,
          password: undefined // Not used for Google accounts
        });
      }

      return {
        name: user.name,
        email: user.email,
        accessToken: generateToken(user.id)
      };
    } catch (err) {
      console.error('Google token verification failed', err);
      return undefined;
    }
  }

  public async getDrivers(): Promise<Driver[]> {
    return await db.fetchDrivers();
  }

  public async suspendDriver(email: string): Promise<void> {
    return await db.suspendAccount(email);
  }

  public async reactivateDriver(email: string): Promise<void> {
    return await db.reactivateAccount(email);
  }

  // https://claude.ai/chat/bb2b0366-a336-4241-b4c4-4da2d74c9bc4
  public async check(authHeader?: string, scopes?: string[]): Promise<SessionUser> {
    // console.log("Check called on real auth service");
    return new Promise((resolve, reject) => {
      if (!authHeader) {
        reject(new Error("Unauthorized"))
        // console.log('header unauthorization')
      }
      else {
        const token = authHeader.split(' ')[1]
        jwt.verify(token, `${process.env.MASTER_SECRET}`,
          (err: jwt.VerifyErrors | null, decoded?: object | string) => {
            const uid = decoded as SessionUser
            if (err) {
              reject(err)
              return
            }
            (async () => {
              const user = await db.checkAuth(uid.id)
              if (!user) {
                reject(new Error("Unauthorized"));
                // console.log('id in JWT invalid checkAuth unauthorization')
                return;
              }
              if (scopes) {
                for (const scope of scopes) {
                  if (!user.roles || !user.roles.includes(scope)) {
                    // console.log('Called is wrong role/scope checkAuth unauthorization')
                    reject(new Error("Unauthorized"))
                    return;
                  }
                }
              }
              resolve({ id: user.id, roles: user.roles });
            })();
          }
        )
      }
    })
  }
}
