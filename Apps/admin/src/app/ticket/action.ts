"use server"
import { Ticket } from "../../ticket";
import { TicketService } from "../../ticket/service";
import { cookies } from 'next/headers'
export async function listAll(jwt: string): Promise<Ticket[]> {
  return new TicketService().getAllTicket(jwt)
}

export async function getTicketDetails(ticketId: string): Promise<Ticket> {
  const cookie = (await cookies()).get('session')?.value;
  return await new TicketService().getTicketInfo(cookie, ticketId);
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
/*
export async function listPaid(jwt: string): Promise<Ticket[] | undefined> {
  try {
    return new TicketService().getPaidTicket(jwt)
  } catch {
    return [];
  }
}
export async function listUnpaid(jwt: string): Promise<Ticket[] | undefined> {
  try {
    return new TicketService().getUnpaidTicket(jwt)
  } catch {
    return [];
  }
}
  */