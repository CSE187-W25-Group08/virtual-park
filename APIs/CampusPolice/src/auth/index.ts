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

import { Midt, Email } from '../types'

export interface Credentials {
  email: Email,
  password: string
}
export interface User {
  name: string,
  id: Midt
}
export interface CheckUser {
  id: string,
  roles: string
}
export interface Authenticated {
  name: string,
  accessToken: Midt
}
