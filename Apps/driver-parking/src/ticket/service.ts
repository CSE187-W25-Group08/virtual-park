import { Ticket } from "."

export class TicketService {
  public async getUserTickets(): Promise<Ticket[]>  {
    return new Promise((resolve, reject) => {
      fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({query: `{ticket {id, vehicle, enforcer, lot, status, description, due, issue, violation, image}}`}),
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
}
