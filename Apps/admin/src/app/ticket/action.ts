import { Ticket } from "../../ticket";
import { TicketService } from "../../ticket/service";

export async function listAll(jwt: string): Promise<Ticket[] | undefined> {
  try {
    return new TicketService().getAllTicket(jwt)
  } catch {
    return [];
  }
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