import { pool } from '../db'
import { Ticket } from './schema';
import * as queries from './queries'

export class TicketService {

  private rowToTicket = async(rows : any) => {
    const tickets = await Promise.all(rows.map(async (ticket : any) => {
      const data = ticket.data
      const ticketObj: Ticket = {
        'id': ticket.id,
        'vehicle': data.vehicle,
        'enforcer': data.enforcer,
        'lot': data.lot,
        'paid': data.paid,
        'description': data.description,
        'due': data.due,
        'issue': data.issue,
        'violation': data.violation,
        'image': data.image,
        'cost' :data.cost
      }
      return ticketObj
    }))
    return tickets;
  }

  public async getAll(userId: string | undefined): Promise<Ticket[]> {
    const query = {
      text: queries.selectAllTickets
      // values: [userId]
    }

    const { rows } = await pool.query(query);
    const tickets = this.rowToTicket(rows);
    return tickets;
  }
  public async getPaid(userId: string | undefined, paidStatus: boolean): Promise<Ticket[]> {
    const query = {
      text: queries.selectPaidTickets,
      values: [paidStatus]
    }

    const { rows } = await pool.query(query);
    const tickets = this.rowToTicket(rows);
    return tickets;
  }
}
