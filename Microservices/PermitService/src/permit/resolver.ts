import { Authorized, Ctx, Query, Resolver } from 'type-graphql'
import { Permit, PermitType } from './schema'
import { Request } from "express"
import { PermitService } from './service'

@Resolver()
export class PermitResolver {
  @Authorized()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query(() => [Permit])
  async permitsByDriver(
    @Ctx() Request: Request
  ): Promise<Permit[]> {
    return await new PermitService().getPermitByDriver(Request.user?.id)
  }

  @Authorized()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query(returns => [PermitType])
  async PermitType(
  ): Promise<PermitType[]> {
    return await new PermitService().getPermitType()
  }
}
