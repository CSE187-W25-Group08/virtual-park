"use server"
import { Ticket } from "../../ticket";
import { TicketService } from "../../ticket/service";
import { LotService } from "../../lot/service";
import { VehicleService } from "../../vehicle/service";
import { cookies } from 'next/headers'
import { Vehicle } from "@/vehicle";
export async function listAll(jwt: string): Promise<Ticket[]> {
  return new TicketService().getAllTicket(jwt)
}

export async function getTicketDetails(ticketId: string): Promise<Ticket> {
  const cookie = (await cookies()).get('session')?.value;
  const ticket = await new TicketService().getTicketInfo(cookie, ticketId);
  console.log("get ticket Details action ticket", ticket);
  ticket.lot = await getLotName(ticket.lot);
  console.log("get ticket Details action ticket", ticket.lot);
  const ticketVehicle = await getVehiclePLate(cookie, ticket.vehicle)
  ticket.vehicle = ticketVehicle.licensePlate
  ticket.driver = ticketVehicle.driver
  console.log("get ticket Details action ticket", ticket.vehicle);
  return ticket;
}

async function getLotName(id: string): Promise<string> {
  try {
    return new LotService().getLotById(id);
  } catch {
    return "unknown lot"
  }
}

async function getVehiclePLate(cookie: string | undefined, id: string): Promise<Vehicle> {
  return new VehicleService().getVehiclePlate(cookie, id);
}

export async function approveAppeal(ticketId: string): Promise<Ticket> {
  const cookie = (await cookies()).get('session')?.value;
  const ticket = await new TicketService().approveAppeal(cookie, ticketId);
  ticket.lot = await getLotName(ticket.lot);
  const ticketVehicle = await getVehiclePLate(cookie, ticket.vehicle)
  ticket.vehicle = ticketVehicle.licensePlate
  ticket.driver = ticketVehicle.driver
  return ticket;
}

export async function rejectAppeal(ticketId: string): Promise<Ticket> {
  const cookie = (await cookies()).get('session')?.value;
  const ticket = await new TicketService().rejectAppeal(cookie, ticketId);
  ticket.lot = await getLotName(ticket.lot);
  const ticketVehicle = await getVehiclePLate(cookie, ticket.vehicle)
  ticket.vehicle = ticketVehicle.licensePlate
  ticket.driver = ticketVehicle.driver
  return ticket;
}
