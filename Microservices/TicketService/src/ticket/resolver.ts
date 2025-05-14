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
  @Authorized('admin')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query(returns => [Ticket])
  async ticket(): Promise<Ticket[]> {
    return await new TicketService().getAllAdmin()
  }

  @Authorized()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query(returns => [Ticket])
  async allTicket(@Ctx() request: Request): Promise<Ticket[]> {
    return await new TicketService().getAllTicket(request.user?.id)
  }

  @Authorized()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query(returns => [Ticket])
  async paidTicket(@Ctx() request: Request): Promise<Ticket[]> {
    return await new TicketService().getPaid(request.user?.id)
  }

  @Authorized()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query(returns => [Ticket])
  async unpaidTicket(@Ctx() request: Request): Promise<Ticket[]> {
    return await new TicketService().getUnpaid(request.user?.id)
  }

  @Authorized()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query(returns => [Ticket])
  async appealedTicket(@Ctx() request: Request): Promise<Ticket[]> {
    return await new TicketService().getAppealed(request.user?.id)
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

  @Authorized()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Mutation(returns => Ticket)
  async setTicketPaid(
    @Arg("id") id: string,
    @Arg("paid") newPaidValue: boolean
  ): Promise<Ticket> {
    return await new TicketService().setPaid(id, newPaidValue)
  }

  @Authorized()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Mutation(returns => Ticket)
  async setTicketAppealed(
    @Arg('id') id: string,
    @Arg('appealStatus') newAppealStatus: string
  ): Promise<Ticket> {
    return await new TicketService().setAppealStatus(id, newAppealStatus)
  }

  @Authorized('admin')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query(returns => [Ticket])
  async allUnpaidTickets(): Promise<Ticket[]> {
    return await new TicketService().getAllUnpaidTickets()
  }

}
