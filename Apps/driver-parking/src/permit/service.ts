import 'server-only'

import {Permit} from '.'

export class PermitService {
  public async getPermitByDriver(cookie: string | undefined):Promise<Permit[]> {
    return new Promise((resolve, reject) => {
      fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cookie}`,
        },
        body: JSON.stringify({query: `{permits {id, issueDate, expDate, type, price}}`}),
      })
      .then(response => { 
        if (response.status != 200) {
          reject('Unauthorized')
        }
        return response.json()} 
      )
      .then(json => {
        resolve(json.data.permits)
      })
      .catch((error) => reject(error))
    })
  }
}