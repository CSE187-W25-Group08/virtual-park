import { AuthChecker } from "type-graphql"
import { Request } from "express"

import { SessionUser } from '../../types/express'


export const expressAuthChecker: AuthChecker<Request> = async (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  { root, args, context, info }, roles) => 
{
  // placeholder
  context.user = {id : 'be006444-2f1d-4751-b5fe-158585ec12aa'} as SessionUser
  return true
}
