"use server";

import { cookies } from "next/headers";

import { Ticket } from "../../ticket";
import { TicketService } from "../../ticket/service";

export async function list(): Promise<Ticket[] | undefined> {
  try {
    const cookie = (await cookies()).get("session")?.value;
    return new TicketService().getUserTickets(cookie)
  } catch {
    return [];
  }
}

export async function listPaid(): Promise<Ticket[] | undefined> {
  try {
    const cookie = (await cookies()).get("session")?.value;
    return new TicketService().getPaidTicket(cookie)
  } catch {
    return [];
  }
}
export async function listUnpaid(): Promise<Ticket[] | undefined> {
  try {
    const cookie = (await cookies()).get("session")?.value;
    return new TicketService().getUnpaidTicket(cookie)
  } catch {
    return [];
  }
}

export async function getTicketById(id : string): Promise<Ticket | undefined> {
  try {
    const cookie = (await cookies()).get("session")?.value;
    return new TicketService().getUserTicket(cookie, id)
  } catch {
    return undefined;
  }
}