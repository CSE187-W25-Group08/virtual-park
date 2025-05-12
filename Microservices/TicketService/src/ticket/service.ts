import { pool } from '../db'
import { Ticket, DBTicket } from './schema';
import * as queries from './queries'

export class TicketService {

  private rowToTicket = async (rows: DBTicket[]) => {
    const tickets = await Promise.all(rows.map(async (ticket: DBTicket) => {
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
        'cost': data.cost,
        'appeal': data.appeal
      }
      return ticketObj
    }))
    return tickets;
  }

  public async getAllAdmin(): Promise<Ticket[]> {
    const query = {
      text: queries.selectAllTicketsAdmin
      // values: [userId]
    }

    const { rows } = await pool.query(query);
    const tickets = await this.rowToTicket(rows);
    return tickets;
  }
  public async getPaid(userId: string | undefined): Promise<Ticket[]> {
    const query = {
      text: queries.selectPaidTickets,
      values: [userId]
    }

    const { rows } = await pool.query(query);
    const tickets = await this.rowToTicket(rows);
    return tickets;
  }

  public async getUnpaid(userId: string | undefined): Promise<Ticket[]> {
    const query = {
      text: queries.selectUnpaidTickets,
      values: [userId]
    }

    const { rows } = await pool.query(query);
    const tickets = await this.rowToTicket(rows);
    return tickets;
  }

  public async getAppealed(userId: string | undefined): Promise<Ticket[]> {
    const query = {
      text: queries.selectAppealedTickets,
      values: [userId]
    }

    const { rows } = await pool.query(query);
    console.log("appeals", rows);
    const tickets = await this.rowToTicket(rows);
    return tickets;
  }

  public async get(userId: string | undefined, ticketId: string): Promise<Ticket> {
    const query = {
      text: queries.selectTicket,
      values: [ticketId, userId]
    }

    const { rows } = await pool.query(query);
    const tickets = await this.rowToTicket(rows);
    return tickets[0];
  }

  public async setPaid(ticketId: string, newPaidValue: boolean): Promise<Ticket> {
    const query = {
      text: queries.updatePaidTicket,
      values: [ticketId, newPaidValue]
    }

    const { rows } = await pool.query(query);
    const tickets = await this.rowToTicket(rows);
    return tickets[0];
  }

  public async setAppealStatus(ticketId: string, newAppealStatus: string): Promise<Ticket> {
    const query = {
      text: queries.updateAppealedTicket,
      values: [ticketId, JSON.stringify(newAppealStatus)]
    }

    const { rows } = await pool.query(query)
    const tickets = await this.rowToTicket(rows)
    return tickets[0]
  }

  public async getActiveAppeals(): Promise<Ticket[]> {
    const query = {
      text: queries.activeAppeals,
    }
    const { rows } = await pool.query(query);
    const tickets = await this.rowToTicket(rows);
    return tickets;
  }

  public async getAllTicket(userId: string | undefined): Promise<Ticket[]> {
    const query = {
      text: queries.selectAllTickets,
      values: [userId]
    }

    const { rows } = await pool.query(query);
    const tickets = await this.rowToTicket(rows);
    return tickets;
  }
}
