import { Authorized, Ctx, Query, Resolver } from 'type-graphql'
import { Permit } from './schema'
import { Request } from "express"
import { PermitService } from './service'

@Resolver()
export class PermitResolver {
  @Authorized()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query(() => [Permit])
  async permits(
    @Ctx() Request: Request
  ): Promise<Permit[]> {
    return await new PermitService().getPermitByDriver(Request.user?.id)
  }
}
