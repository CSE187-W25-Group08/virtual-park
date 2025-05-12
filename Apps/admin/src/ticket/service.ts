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

  /*
  public async getPaidTicket(cookie: string | undefined): Promise<Ticket[]> {
    return new Promise((resolve, reject) => {
      fetch('http://localhost:4010/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cookie}`,
        },
        body: JSON.stringify({ query: `{paidTicket {id, vehicle, enforcer, lot, paid, description, due, issue, violation, image, cost, appeal}}` }),
      })
        .then(response => {
          if (response.status != 200) {
            reject('Unauthorized')
          }
          return response.json()
        }
        )
        .then(json => {
          resolve(json.data.paidTicket)
        })
        .catch(() => reject('Unauthorized'))
    })
  }

  public async getUnpaidTicket(cookie: string | undefined): Promise<Ticket[]> {
    return new Promise((resolve, reject) => {
      fetch('http://localhost:4010/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cookie}`,
        },
        body: JSON.stringify({ query: `{unpaidTicket {id, vehicle, enforcer, lot, paid, description, due, issue, violation, image, cost, appeal}}` }),
      })
        .then(response => {
          if (response.status != 200) {
            reject('Unauthorized')
          }
          return response.json()
        }
        )
        .then(json => {
          resolve(json.data.unpaidTicket)
        })
        .catch(() => reject('Unauthorized'))
    })
  }
  */

  public async getActiveAppeals(cookie: string | undefined): Promise<Ticket[]> {
    return new Promise((resolve, reject) => {
      fetch('http://localhost:4010/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cookie}`,
        },
        body: JSON.stringify({ query: `{activeAppeals {id, vehicle, enforcer, lot, paid, description, due, issue, violation, image, cost, appeal}}` }),
      })
        .then(response => {
          if (response.status != 200) {
            reject('Unauthorized')
          }
          return response.json()
        }
        )
        .then(json => {
          resolve(json.data.unpaidTicket)
        })
        .catch(() => reject('Unauthorized'))
    })
  }

}