import {
  Query,
  Mutation,
  Resolver,
  Authorized,
  Arg
} from "type-graphql"
import { Lot, UpdateLotData } from "./schema"
import { LotService } from "./service"


@Resolver()
export class LotResolver {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query(returns => [Lot])
  async getAll(): Promise<Lot[]> {
    console.log("get all lots resolver called")
    return await new LotService().getAll()
  }

  @Authorized('admin')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Mutation(returns => Lot)
  async putId(
    @Arg("id") id: string,
    @Arg("data") data: UpdateLotData
  ): Promise<Lot> {
    return await new LotService().updateId(id, data)
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query(returns => Lot)
  async getLotById(@Arg("id") id: string): Promise<Lot> {
    console.log("get lot by id resolver called with", id)
    return await new LotService().getById(id);
  }

}
