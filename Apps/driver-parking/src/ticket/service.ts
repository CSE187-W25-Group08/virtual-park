import { Ticket } from "."

export class TicketService {
  /*
  Currently unused
  public async getUserTickets(cookie: string|undefined): Promise<Ticket[]>  {
    return new Promise((resolve, reject) => {
      fetch('http://localhost:4010/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cookie}`,
        },
        body: JSON.stringify({query: `{ticket {id, vehicle, enforcer, lot, paid, description, due, issue, violation, image, cost}}`}),
      })
      .then(response => { 
        if (response.status != 200) {
          reject('Unauthorized')
        }
        return response.json()} 
      )
      .then(json => {
        resolve(json.data.ticket)
      })
      .catch(() => reject('Unauthorized'))
    })
  }
    */

  public async getPaidTicket(cookie: string|undefined): Promise<Ticket[]>  {
    return new Promise((resolve, reject) => {
      fetch('http://localhost:4010/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cookie}`,
        },
        body: JSON.stringify({query: `{paidTicket {id, vehicle, enforcer, lot, paid, description, due, issue, violation, image, cost, appeal}}`}),
      })
      .then(response => { 
        if (response.status != 200) {
          reject('Unauthorized')
        }
        return response.json()} 
      )
      .then(json => {
        resolve(json.data.paidTicket)
      })
      .catch(() => reject('Unauthorized'))
    })
  }

  public async getUnpaidTicket(cookie: string|undefined): Promise<Ticket[]>  {
    return new Promise((resolve, reject) => {
      fetch('http://localhost:4010/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cookie}`,
        },
        body: JSON.stringify({query: `{unpaidTicket {id, vehicle, enforcer, lot, paid, description, due, issue, violation, image, cost, appeal}}`}),
      })
      .then(response => { 
        if (response.status != 200) {
          reject('Unauthorized')
        }
        return response.json()} 
      )
      .then(json => {
        resolve(json.data.unpaidTicket)
      })
      .catch(() => reject('Unauthorized'))
    })
  }

  public async getAppealedTicket(cookie: string|undefined): Promise<Ticket[]>  {
    return new Promise((resolve, reject) => {
      fetch('http://localhost:4010/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cookie}`,
        },
        body: JSON.stringify({query: `{appealedTicket {id, vehicle, enforcer, lot, paid, description, due, issue, violation, image, cost, appeal}}`}),
      })
      .then(response => { 
        if (response.status != 200) {
          reject('Unauthorized')
        }
        return response.json()} 
      )
      .then(json => {
        resolve(json.data.appealedTicket)
      })
      .catch(() => reject('Unauthorized'))
    })
  }

  public async getUserTicket(cookie: string|undefined, ticketId : string): Promise<Ticket>  {
    return new Promise((resolve, reject) => {
      fetch('http://localhost:4010/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cookie}`,
        },
        body: JSON.stringify({query: `{ticketId (id : "` + ticketId + `") {id, vehicle, enforcer, lot, paid, description, due, issue, violation, image, cost, appeal}}`}),
      })
      .then(response => { 
        if (response.status != 200) {
          reject('Unauthorized')
        }
        return response.json()} 
      )
      .then(json => {
        resolve(json.data.ticketId)
      })
      .catch(() => reject('Unauthorized'))
    })
  }
  public async updatePaidTicket(cookie: string|undefined, ticketId : string, paid: boolean): Promise<Ticket>  {
    return new Promise((resolve, reject) => {
      fetch('http://localhost:4010/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cookie}`,
        },
        body: JSON.stringify({
          query: `
            mutation {
              setTicketPaid(id: "${ticketId}", paid: ${paid}) {
                id, vehicle, enforcer, lot, paid, description, due, issue, violation, image, cost, appeal
              }
            }
          `
        })
      })
      .then(response => { 
        if (response.status != 200) {
          reject('Unauthorized')
        }
        return response.json()} 
      )
      .then(json => {
        resolve(json.data.setTicketPaid)
      })
      .catch(() => reject('Unauthorized'))
    })
  }
}
