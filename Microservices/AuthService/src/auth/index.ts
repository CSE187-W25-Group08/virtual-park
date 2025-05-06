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

import { midt, email } from "../types"

export interface Credentials {
  email: email,
  password: string
}
export interface User {
  name: string,
  id: midt
}
export interface CheckUser {
  id: string,
  roles: string
}
export interface Authenticated {
  name: string,
  accessToken: midt
}
export interface NewUser {
  name: string,
  email: email,
  password: string
}

export interface Driver {
  name: string,
  email: string,
  jwt: midt,
  registerDate: string,
}
