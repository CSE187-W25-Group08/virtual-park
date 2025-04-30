import {
  Query, 
  Resolver,
  Mutation,
  Arg,
  Authorized, 
  // Ctx 
} from "type-graphql"
import { Ticket } from "./schema"
import { TicketService } from "./service"
// import { Request } from "express"


@Resolver()
export class TicketResolver {
  @Authorized("driver")
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query(returns => [Ticket])
  async ticket(
  ): Promise<Ticket[]> {
    return await new TicketService().getAll()
  }

}
