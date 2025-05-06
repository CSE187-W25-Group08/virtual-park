import {
  Body,
  Controller,
  Post,
  Response,
  Route,
  Get,
  Security,
  Request,
  Query
} from 'tsoa'

import { Credentials, Authenticated } from '.'
import { AuthService } from './authService'
import { SessionUser } from '../types'

@Route('auth')
export class AuthController extends Controller {
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
  @Response('401', 'Unauthorized')
  public async check(
    @Request() request: Express.Request,
    @Query() scope?: string
  ): Promise<SessionUser | undefined> {
    const user = request.user as SessionUser;
    if (scope === 'adminonly' && !user.roles?.includes('admin')) {
      this.setStatus(401);
    } else {
      return user;
    }
  }
}
