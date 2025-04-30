import { AuthChecker } from "type-graphql"
import { Request } from "express"


export const expressAuthChecker: AuthChecker<Request> = async (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  { root, args, context, info },) => 
{
  // placeholder
  context.user = {id : '7d9dcfd9-096c-4cae-8f57-1de15f6caa79'}
  return true
}
