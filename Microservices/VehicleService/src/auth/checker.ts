import { AuthChecker } from "type-graphql"
import { Request } from "express"

import { SessionUser } from '../../types/express'


export const expressAuthChecker: AuthChecker<Request> = async (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  { root, args, context, info }, roles) => 
{
  // placeholder
  context.user = {id : '45c90975-92e0-4a51-b5ea-2fe5f8613b54'} as SessionUser
  return true
}
