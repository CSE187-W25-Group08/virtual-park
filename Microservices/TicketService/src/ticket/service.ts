import { pool } from '../db'
import { Ticket } from './schema';
import * as queries from './queries'
import { SessionUser } from '../types/express';

export class TicketService {

  public async getAll(userId: string | undefined): Promise<Ticket[]> {
    const query = {
      text: queries.selectAllTickets
      // values: [userId]
    }

    const { rows } = await pool.query(query);
    console.log(rows)
    const tickets = await Promise.all(rows.map(async (ticket) => {
      const data = ticket.data
      const ticketObj: Ticket = {
        'id': ticket.id,
        'vehicle': data.vehicle,
        'enforcer': data.enforcer,
        'lot': data.lot,
        'status': data.status,
        'description': data.description,
        'due': data.due,
        'issue': data.issue,
        'violation': data.violation,
        'image': data.image,
        'deductible' :data.deductible
      }
      return ticketObj
    }))
    console.log(tickets)

    return tickets;
  }
}
