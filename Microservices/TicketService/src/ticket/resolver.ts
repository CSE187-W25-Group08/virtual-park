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
  @Authorized()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query(returns => [Ticket])
  async ticket(@Ctx() request: Request): Promise<Ticket[]> {
    return await new TicketService().getAll(request.user?.id)
  }

  @Authorized()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query(returns => [Ticket])
  async paidTicket(@Ctx() request: Request): Promise<Ticket[]> {
    return await new TicketService().getPaid(request.user?.id, true)
  }

  @Authorized()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query(returns => [Ticket])
  async unpaidTicket(@Ctx() request: Request): Promise<Ticket[]> {
    return await new TicketService().getPaid(request.user?.id, false)
  }

  @Authorized()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query(returns => Ticket)
  async ticketId(
    @Arg("id") id: string,
    @Ctx() request: Request
  ): Promise<Ticket> {
    return await new TicketService().get(request.user?.id, id)
  }



}
