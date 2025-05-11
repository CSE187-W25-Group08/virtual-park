import {
  Query,
  Resolver,
} from "type-graphql"
import { Lot} from "./schema"
import { LotService} from "./service"


@Resolver()
export class LotResolver {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query(returns => [Lot])
  async getAll(): Promise<Lot[]> {
    return await new LotService().getAll()
  }


}
