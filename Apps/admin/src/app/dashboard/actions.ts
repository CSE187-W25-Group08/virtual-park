'use server'
import { Ticket } from "@/ticket"
import { TicketService } from "@/ticket/service"
import { cookies } from 'next/headers'

export async function listAppeals(): Promise<Ticket[] | undefined> {
  try {
    const cookie = (await cookies()).get('session')?.value;
    return new TicketService().getActiveAppeals(cookie)
  } catch {
    return [];
  }
}