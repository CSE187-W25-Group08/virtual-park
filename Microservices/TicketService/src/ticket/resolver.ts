import {
  Query,
  Resolver,
  Mutation,
  Arg,
  Authorized,
  Ctx,
  Int
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
    const tickets = await new TicketService().getPaid(request.user?.id)
    console.log("paid tickets resolver", tickets);
    return tickets;
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

  @Authorized('driver')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Mutation(returns => Ticket)
  async setTicketAppealed(
    @Arg('id') id: string,
    @Arg('appealStatus') newAppealStatus: string,
    @Arg('appealReason') appealReason: string
  ): Promise<Ticket> {
    return await new TicketService().setAppealStatus(id, newAppealStatus, appealReason)
  }

  @Authorized('admin')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query(returns => [Ticket])
  async allUnpaidTickets(): Promise<Ticket[]> {
    return await new TicketService().getAllUnpaidTickets()
  }

  @Authorized('admin')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query(returns => Ticket)
  async getTicketInfo(@Arg('ticketId') id: string): Promise<Ticket | undefined> {
    return await new TicketService().getTicketInfo(id)
  }

  @Authorized('admin')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Mutation(returns => Ticket)
  async approveAppeal(@Arg('id') id: string): Promise<Ticket> {
    return await new TicketService().respondToAppeal(id, "approved")
  }

  @Authorized('admin')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Mutation(returns => Ticket)
  async rejectAppeal(@Arg('id') id: string): Promise<Ticket> {
    return await new TicketService().respondToAppeal(id, "rejected")
  }

  @Authorized('enforcement')
  @Mutation(() => Ticket)
  async ticketIssue(
    // @Arg("driverID") driverID: string | null,
    @Arg("driverID", () => String, { nullable: true }) driverID: string | null,
    @Arg("vehicleID") vehicleID: string,
    @Arg("lot") lot: string,
    @Arg("paid") paid: boolean,
    @Arg("description") description: string,
    @Arg("violation") violation: string,
    @Arg("cost") cost: number,
    @Ctx() request: Request,
    @Arg("image", { nullable: true }) image?: string,
  ): Promise<Ticket> {
    return await new TicketService().issueTickets(
      driverID, vehicleID, request.user?.id, lot, paid, description, violation, cost, image
    );
  }


  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query(returns => Int)
  async unpaidTicketCount(
    @Arg("driverId") driverId: string,
  ): Promise<number> {
    return await new TicketService().getUnpaidExternal(driverId)
  }

}
