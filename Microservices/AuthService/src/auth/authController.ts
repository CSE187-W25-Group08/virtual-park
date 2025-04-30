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

import {
  Body,
  Controller,
  Post,
  Response,
  Route,
  SuccessResponse,
  Get,
  Security,
  Request
} from 'tsoa'

import { Credentials, Authenticated, NewUser } from '.'
import { AuthService } from './authService'
import { SessionUser } from '../types'

@Route('auth')
export class AuthController extends Controller {

  @Post('signup')
  @Response('409', 'Email already associated with a driver')
  @SuccessResponse('201', 'Account Created')
  public async signup(
    @Body() newUserInfo: NewUser,
  ): Promise<Authenticated | undefined> {
    return new AuthService().signUp(newUserInfo)
      .then(async (user: Authenticated | undefined): Promise<Authenticated | undefined> => {
        if (!user) {
          this.setStatus(409)
        }
        return user
      })
  }

  @Post('login')
  @Response('401', 'Unauthorised')
  public async login(
    @Body() credentials: Credentials,
  ): Promise<Authenticated | undefined> {
    return new AuthService().login(credentials)
      .then(async (user: Authenticated | undefined): Promise<Authenticated | undefined> => {
        if (!user) {
          this.setStatus(401)
        }
        return user
      })
  }

  @Get('check')
  @Security("jwt")
  @Response('401', 'Unauthorised')
  public async check(
    @Request() request: Express.Request
  ): Promise<SessionUser | undefined> {
    // Nothing to check, Express middleware will have rejected the request
    // by now if the caller is unauthorised
    return new Promise((resolve) => {
      resolve(request.user)
    })
  }
}
