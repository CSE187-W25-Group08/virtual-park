import { Authorized, Query, Resolver } from 'type-graphql'
import { Permit } from './schema'

import { PermitService } from './service'

@Resolver()
export class PermitResolver {
  @Authorized('driver')
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Query(returns => [Permit])
    async permits(
    ): Promise<Permit[]> {
      return await new PermitService().getAll()
    }
}
