"use server";

import { cookies } from "next/headers";

import { Ticket } from "../../../ticket";
import { TicketService } from "../../../ticket/service";

/* Currently unused
export async function list(): Promise<Ticket[] | undefined> {
  try {
    const cookie = (await cookies()).get("session")?.value;
    return new TicketService().getUserTickets(cookie)
  } catch {
    return [];
  }
}
*/

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

export async function listAppealed(): Promise<Ticket[] | undefined> {
  try {
    const cookie = (await cookies()).get("session")?.value;
    return new TicketService().getAppealedTicket(cookie)
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

export async function setTicketPaid(id : string, paid: boolean): Promise<Ticket | undefined> {
  try {
    const cookie = (await cookies()).get("session")?.value;
    return new TicketService().updatePaidTicket(cookie, id, paid)
  } catch {
    return undefined;
  }
}

export async function setTicketAppealed(id : string, appeal: string): Promise<Ticket | undefined> {
  try {
    const cookie = (await cookies()).get("session")?.value;
    return new TicketService().updateAppealedTicket(cookie, id, appeal)
  } catch {
    return undefined;
  }
}
