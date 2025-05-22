import {
  Body,
  Controller,
  Post,
  Put,
  Response,
  Route,
  SuccessResponse,
  Get,
  Security,
  Request,
  Query
} from 'tsoa'

import { Credentials, Authenticated, NewUser, Driver, NewEnforcement, Enforcement } from '.'
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

  @Post('google-login')
  @Response('401', 'Unauthorised')
  public async googleLogin(@Body() body: { token: string }): Promise<Authenticated | undefined> {
    const user = await new AuthService().loginWithGoogle(body.token);
    if (!user) this.setStatus(401);
    return user;
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

  @Get('enforcementCheck')
  @Security("jwt")
  @Response('401', 'Unauthorized')
  public async enforcementCheck(
    @Request() request: Express.Request,
    @Query() scope?: string
  ): Promise<SessionUser | undefined> {
    const user = request.user as SessionUser;
    if (scope === 'enforcementonly' && !user.roles?.includes('enforcement')) {
      this.setStatus(401);
    } else {
      return user;
    }
  }

  @Post('enforcement')
  @Security("jwt", ["admin"])
  @Response('401', 'Unauthorized')
  @Response('409', 'Email already associated with an enforcement officer')
  @SuccessResponse('201', 'Account Created')
  public async signUpEnforcement(
    @Body() enforcementDetails: NewEnforcement,
  ): Promise<Enforcement | undefined> {
    return new AuthService().signUpEnforcement(enforcementDetails)
      .then(async (user: Enforcement | undefined): Promise<Enforcement | undefined> => {
        if (!user) {
          this.setStatus(409)
        }
        return user
      })
  }

  @Get('enforcement')
  @Security("jwt", ["admin"])
  @Response('401', 'Unauthorized')
  public async enforcement(): Promise<Enforcement[]> {
    const enforcement = await new AuthService().getEnforcementOfficers()
    return enforcement
  }

  @Get('drivers')
  @Security("jwt", ["admin"])
  @Response('401', 'Unauthorized')
  public async drivers(): Promise<Driver[]> {
    const drivers = await new AuthService().getDrivers();
    return drivers
  }

  @Put('suspend')
  @Security("jwt", ["admin"])
  @Response('401', 'Unauthorized')
  public async suspend(
    @Body() body: { email: string },
  ): Promise<void> {
    const { email } = body;
    await new AuthService().suspendDriver(email);
  }

  @Put('reactivate')
  @Security("jwt", ["admin"])
  @Response('401', 'Unauthorized')
  public async reactivate(
    @Body() body: { email: string },
  ): Promise<void> {
    const { email } = body;
    await new AuthService().reactivateDriver(email);
  }

}
