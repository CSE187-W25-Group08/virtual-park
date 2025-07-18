import { Ticket } from "."

export class TicketService {
  public async getAllTicket(cookie: string | undefined): Promise<Ticket[]> {
    return new Promise((resolve, reject) => {
      fetch('http://localhost:4010/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cookie}`,
        },
        body: JSON.stringify({ query: `{allTicket {id, vehicle, enforcer, lot, paid, description, due, issue, violation, image, cost, appeal}}` }),
      })
        .then(response => {
          if (response.status != 200) {
            reject('Unauthorized')
          }
          return response.json()
        }
        )
        .then(json => {
          resolve(json.data.allTicket)
        })
        .catch(() => reject('Unauthorized'))
    })
  }

  public async getUnpaidTickets(cookie: string | undefined): Promise<Ticket[]> {
    return new Promise((resolve, reject) => {
      fetch('http://localhost:4010/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cookie}`,
        },
        body: JSON.stringify({ query: `{allUnpaidTickets {id, vehicle, enforcer, lot, paid, description, due, issue, violation, image, cost, appeal}}` }),
      })
        .then(response => {
          if (response.status != 200) {
            reject('Unauthorized')
          }
          return response.json()
        }
        )
        .then(json => {
          resolve(json.data.allUnpaidTickets)
        })
        .catch(() => reject('Unauthorized'))
    })
  }

  public async getTicketInfo(cookie: string | undefined, ticketId: string): Promise<Ticket> {
    return new Promise((resolve, reject) => {
      fetch('http://localhost:4010/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cookie}`,
        },
        body: JSON.stringify({
          query: `{getTicketInfo (ticketId: "${ticketId}")
          {id, vehicle, enforcer, lot, paid, description, due, issue, violation, image, cost, appeal, appealReason}}` }),
      })
        .then(response => {
          if (response.status != 200) {
            reject('Unauthorized')
          }
          return response.json()
        }
        )
        .then(json => {
          resolve(json.data.getTicketInfo)
        })
        .catch((err) => {
          console.error('Fetch error:', err);
          reject('Unknown Lot');
        });
    })
  }

  public async approveAppeal(cookie: string | undefined, ticketId: string): Promise<Ticket> {
    return new Promise((resolve, reject) => {
      fetch('http://localhost:4010/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cookie}`,
        },
        body: JSON.stringify({
          query: `mutation { approveAppeal (id: "${ticketId}") 
          {id, vehicle, enforcer, lot, paid, description, due, issue, violation, image, cost, appeal, appealReason}}` }),
      })
        .then(response => {
          if (response.status != 200) {
            reject('Unauthorized')
          }
          return response.json()
        }
        )
        .then(json => {
          resolve(json.data.approveAppeal)
        })
        .catch((err) => {
          console.error('Fetch error:', err);
          reject('Unknown Lot');
        });
    })
  }

  public async rejectAppeal(cookie: string | undefined, ticketId: string): Promise<Ticket> {
    return new Promise((resolve, reject) => {
      fetch('http://localhost:4010/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cookie}`,
        },
        body: JSON.stringify({
          query: `mutation { rejectAppeal (id: "${ticketId}") 
          {id, vehicle, enforcer, lot, paid, description, due, issue, violation, image, cost, appeal, appealReason}}` }),
      })
        .then(response => {
          if (response.status != 200) {
            reject('Unauthorized')
          }
          return response.json()
        }
        )
        .then(json => {
          resolve(json.data.rejectAppeal)
        })
        .catch((err) => {
          console.error('Fetch error:', err);
          reject('Unknown Lot');
        });
    })
  }
}