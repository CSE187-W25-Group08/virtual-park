'use server'
import { Ticket } from "@/ticket"
import { TicketService } from "@/ticket/service"
import { cookies } from 'next/headers'

export async function listUnpaid(): Promise<Ticket[] | undefined> {
  try {
    const cookie = (await cookies()).get('session')?.value;
    return new TicketService().getUnpaidTickets(cookie)
  } catch {
    return [];
  }
}
