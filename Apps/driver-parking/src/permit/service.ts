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
        body: JSON.stringify({query: `{permitsByDriver {issueDate, expDate, type, price}}`}),
      })
      .then(response => { 
        if (response.status != 200) {
          reject('Unauthorized')
        }
        return response.json()} 
      )
      .then(json => {
        resolve(json.data.permitsByDriver)
      })
      .catch((error) => reject(error))
    })
  }

  public async getpermitType(cookie: string | undefined):Promise<Permit[]> {
    return new Promise((resolve, reject) => {
      fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cookie}`,
        },
        body: JSON.stringify({query: `{PermitType {type, price}}`}),
      })
      .then(response => { 
        if (response.status != 200) {
          reject('Unauthorized')
        }
        return response.json()} 
      )
      .then(json => {
        resolve(json.data.PermitType)
      })
      .catch((error) => reject(error))
    })
  }
}