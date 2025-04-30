import { Authorized, Query, Resolver } from 'type-graphql'
import { Vehicle } from './schema'

import { VehicleService } from './service'

@Resolver()
export class VehicleResolver {
  @Authorized('driver')
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Query(returns => [Vehicle])
    async vehicle(
    ): Promise<Vehicle[]> {
      return await new VehicleService().getAll()
    }
}
