import { Ticket } from ".";

export class TicketService {
  private async fetchGraphQL<T>(cookie: string | undefined, query: string, key: string): Promise<T> {
    try {
      const response = await fetch('http://localhost:4010/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cookie}`,
        },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        console.error(`Fetch failed with status ${response.status} for query: ${key}`);
        throw new Error('Unauthorized');
      }

      const json = await response.json();

      if (!json?.data || !json.data[key]) {
        console.error(`No data returned for query: ${key}`, json);
        throw new Error('Malformed response');
      }

      return json.data[key];
    } catch (err) {
      console.error(`Error during fetch for "${key}":`, err);
      throw new Error('Failed to fetch ' + key);
    }
  }

  public async getPaidTicket(cookie: string | undefined): Promise<Ticket[]> {
    return this.fetchGraphQL<Ticket[]>(cookie, `
      {
        paidTicket {
          id, vehicle, enforcer, lot, paid, description, due, issue, violation, image, cost, appeal
        }
      }`, 'paidTicket');
  }

  public async getUnpaidTicket(cookie: string | undefined): Promise<Ticket[]> {
    return this.fetchGraphQL<Ticket[]>(cookie, `
      {
        unpaidTicket {
          id, vehicle, enforcer, lot, paid, description, due, issue, violation, image, cost, appeal
        }
      }`, 'unpaidTicket');
  }

  public async getAppealedTicket(cookie: string | undefined): Promise<Ticket[]> {
    return this.fetchGraphQL<Ticket[]>(cookie, `
      {
        appealedTicket {
          id, vehicle, enforcer, lot, paid, description, due, issue, violation, image, cost, appeal
        }
      }`, 'appealedTicket');
  }

  public async getUserTicket(cookie: string | undefined, ticketId: string): Promise<Ticket> {
    return this.fetchGraphQL<Ticket>(cookie, `
      {
        ticketId(id: "${ticketId}") {
          id, vehicle, enforcer, lot, paid, description, due, issue, violation, image, cost, appeal
        }
      }`, 'ticketId');
  }

  public async updatePaidTicket(cookie: string | undefined, ticketId: string, paid: boolean): Promise<Ticket> {
    return this.fetchGraphQL<Ticket>(cookie, `
      mutation {
        setTicketPaid(id: "${ticketId}", paid: ${paid}) {
          id, vehicle, enforcer, lot, paid, description, due, issue, violation, image, cost, appeal
        }
      }`, 'setTicketPaid');
  }

  public async updateAppealedTicket(cookie: string | undefined, ticketId: string, appealed: string, appealReason: string): Promise<Ticket> {
    return this.fetchGraphQL<Ticket>(cookie, `
      mutation {
        setTicketAppealed(id: "${ticketId}", appealStatus: "${appealed}", appealReason: "${appealReason}") {
          id, vehicle, enforcer, lot, paid, description, due, issue, violation, image, cost, appeal, appealReason
        }
      }`, 'setTicketAppealed');
  }
}
