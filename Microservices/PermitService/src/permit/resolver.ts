import { Authorized, Ctx, Query, Resolver, Arg } from 'type-graphql'
import { Permit, PermitType, PermitValid } from './schema'
import { Request } from "express"
import { PermitService } from './service'

@Resolver()
export class PermitResolver {
  @Authorized()
   
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
  /* should Only allow officer to do that, and in the future, I might consider adding a member with the role of enforcement officer */
  @Authorized('enforcement')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query(returns => [PermitValid])
  async getPermitBycarPlate(  @Arg("input") carPlate: string
  ): Promise<PermitValid[]> {
    return await new PermitService().getPermitByCar(carPlate)
  }
}

