export interface Ticket {
  id: string,
  vehicle: string,
  enforcer: string,
  lot: string,
  paid: boolean,
  description: string,
  due: string,
  issue: string,
  violation: string,
  image: string,
  cost: number,
  appeal: string,
  appealReason?: string
}

export interface TicketId {
  ticketId: string
}