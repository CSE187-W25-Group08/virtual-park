import {
  Body,
  Controller,
  Post,
  Response,
  Route,
  SuccessResponse,
  Get,
  Security,
  Request,
  Path
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

  @Get('check/:scope?')
  @Security("jwt")
  @Response('401', 'Unauthorised')
  public async check(@Request() request: Express.Request, @Path() scope?: string): Promise<SessionUser | undefined> {
    return new Promise((resolve, reject) => {
      const user = request.user as SessionUser
      resolve(request.user)
      if (scope === 'adminonly' && (!user.roles || !user.roles.includes('admin'))) {
        reject(new Error("Unauthorized: Admin role required"))
      } else {
        resolve(user)
      }
    })
  }
}
