"use server"
import { Ticket } from "../../ticket";
import { TicketService } from "../../ticket/service";
import { LotService } from "../../lot/service";
import { VehicleService } from "../../vehicle/service";
import { cookies } from 'next/headers'
export async function listAll(jwt: string): Promise<Ticket[]> {
  return new TicketService().getAllTicket(jwt)
}

export async function getTicketDetails(ticketId: string): Promise<Ticket> {
  const cookie = (await cookies()).get('session')?.value;
  const ticket = await new TicketService().getTicketInfo(cookie, ticketId);
  console.log("get ticket Details action ticket", ticket);
  ticket.lot = await getLotName(ticket.lot);
  console.log("get ticket Details action ticket", ticket.lot);
  ticket.vehicle = await getVehiclePLate(cookie, ticket.vehicle)
  console.log("get ticket Details action ticket", ticket.vehicle);
  return ticket;
  // const testTicket = {
  //   id: "a1b2c3d4",
  //   vehicle: "uuid",
  //   enforcer: "uuid",
  //   lot: "uuid",
  //   paid: false,
  //   description: "Parked over the white line taking up multiple spots",
  //   due: "2025-06-15T23:59:59Z",
  //   issue: "2025-05-10T14:32:00Z",
  //   violation: "Improper Parking - Line Violation",
  //   image: "https://i0.wp.com/06880danwoog.com/wp-content/uploads/2013/06/bad-parking.jpg",
  //   cost: 45.00,
  //   appeal: "submitted"
  // };
  // return testTicket;

}
async function getLotName(id: string): Promise<string> {
  try {
    return new LotService().getLotById(id);
  } catch {
    return "unknown lot"
  }
}

async function getVehiclePLate(cookie: string | undefined, id: string): Promise<string> {
  try {
    return new VehicleService().getVehiclePlate(cookie, id);
  } catch {
    return "unregisted vehicle"
  }
}

export async function approveAppeal(ticketId: string): Promise<Ticket> {
  const cookie = (await cookies()).get('session')?.value;
  const ticket = await new TicketService().approveAppeal(cookie, ticketId);
  ticket.lot = await getLotName(ticket.lot);
  ticket.vehicle = await getVehiclePLate(cookie, ticket.vehicle)
  return ticket;
}

export async function rejectAppeal(ticketId: string): Promise<Ticket> {
  const cookie = (await cookies()).get('session')?.value;
  const ticket = await new TicketService().rejectAppeal(cookie, ticketId);
  ticket.lot = await getLotName(ticket.lot);
  ticket.vehicle = await getVehiclePLate(cookie, ticket.vehicle)
  return ticket;
}
