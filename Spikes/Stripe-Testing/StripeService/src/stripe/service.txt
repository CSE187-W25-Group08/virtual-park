import { Ticket, DBTicket } from "./schema"

export class StripeService {
  private rowToTicket = async (rows: DBTicket[]) => {
    const tickets = await Promise.all(
      rows.map(async (ticket: DBTicket) => {
        const data = ticket.data
        const ticketObj: Ticket = {
          id: ticket.id,
          vehicle: data.vehicle,
          enforcer: data.enforcer,
          lot: data.lot,
          paid: data.paid,
          description: data.description,
          due: data.due,
          issue: data.issue,
          violation: data.violation,
          image: data.image,
          cost: data.cost,
          appeal: data.appeal,
          appealReason: data.appealReason || "",
        }
        return ticketObj
      })
    )
    return tickets
  }

  public async getTest(): Promise<string> {
    return 'hi'
  }
}
