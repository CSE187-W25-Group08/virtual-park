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
import { Credentials, Authenticated, NewUser } from '.'

// https://chat.deepseek.com/a/chat/s/b44e480a-f720-4b4e-b923-ac03aa7f7fc6
const JWT_SECRET = process.env.MASTER_SECRET;
const JWT_OPTIONS: jwt.SignOptions = {
  expiresIn: "30m",
  algorithm: "HS256"
};
export function generateToken(userId: UUID, text = "nonauth"): midt {
  return jwt.sign({ id: userId }, JWT_SECRET + text, JWT_OPTIONS);
}

export class AuthService {
  public async signUp(signUpDetails: NewUser): Promise<Authenticated | undefined> {
    const newUser = await db.createNewUser(signUpDetails);
    if (newUser) {
      return { name: newUser.name, accessToken: generateToken(newUser.id, '') };
    } else {
      return undefined
    }
  }
  public async login(credentials: Credentials): Promise<Authenticated | undefined> {
    const user = await db.verifyLogin(credentials);
    if (user) {
      return { name: user.name, accessToken: generateToken(user.id, '') };
    } else {
      return undefined
    }
  }
  // https://claude.ai/chat/bb2b0366-a336-4241-b4c4-4da2d74c9bc4

  public async check(authHeader?: string, scopes?: string[]): Promise<SessionUser> {
    console.log("Check called on real auth service");
    return new Promise((resolve, reject) => {
      if (!authHeader) {
        reject(new Error("Unauthorized"))
        console.log('header unauthorization')
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
                console.log('id in JWT invalid checkAuth unauthorization')
                return;
              }
              if (scopes) {
                for (const scope of scopes) {
                  if (!user.roles || !user.roles.includes(scope)) {
                    console.log('Called is wrong role/scope checkAuth unauthorization')
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
