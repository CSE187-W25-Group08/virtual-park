import {
  Query,
  Resolver,
  Mutation,
  Arg,
  Authorized,
  Ctx
} from "type-graphql"
import { Ticket } from "./schema"
import { TicketService } from "./service"
import { Request } from "express"


@Resolver()
export class TicketResolver {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query(returns => [Ticket])
  async ticket(@Ctx() request: Request): Promise<Ticket[]> {
    return await new TicketService().getAll(request.user?.id)
  }

}
