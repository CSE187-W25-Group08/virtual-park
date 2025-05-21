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

import { Request } from "express"
import { AuthService } from './authService'
import { SessionUser } from '../types/index'

export function expressAuthentication(
  request: Request,
   
  securityName: string,
  scopes?: string[]
): Promise<SessionUser> {
  return new AuthService().check(request.headers.authorization, scopes)
}