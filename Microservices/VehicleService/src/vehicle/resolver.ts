import { Authorized, Query, Resolver, Ctx } from 'type-graphql'
import { Vehicle } from './schema'
import { Request } from "express"
import { VehicleService } from './service'

@Resolver()
export class VehicleResolver {
  // should be admin only, but roles not yet implemented
  @Authorized()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query(returns => [Vehicle])
  async vehicle(
  ): Promise<Vehicle[]> {
    return await new VehicleService().getAll()
  }

  @Authorized()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query(returns => [Vehicle])
  async userVehicle(@Ctx() request: Request): Promise<Vehicle[]> {
    return await new VehicleService().getUserVehicles(request.user?.id)
  }
}