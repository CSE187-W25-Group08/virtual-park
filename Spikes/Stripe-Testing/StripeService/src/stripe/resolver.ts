import {
  Query,
  Resolver,
} from "type-graphql"
import { Ticket } from "./schema"
import { StripeService } from "./service"


@Resolver()
export class StripeResolver {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query(returns => [Ticket])
  async ticket(): Promise<string> {
    return await new StripeService().getTest()
  }

}
