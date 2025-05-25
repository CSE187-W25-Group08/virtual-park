import {Permit, PermitType} from '.'

export async function getPermitByDriver(cookie: string | undefined):Promise<Permit[]> {
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

export async function getPermitType(cookie: string | undefined):Promise<PermitType[]> {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:4000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cookie}`,
      },
      body: JSON.stringify({query: `{PermitType {id, type, price}}`}),
    })
    .then(response => { 
      if (response.status != 200) {
        return reject('Unauthorized')
      }
      return response.json()} 
    )
    .then(json => {
      resolve(json.data.PermitType)
    })
    .catch((error) => reject(error))
  })
}

export async function getValidPermit(cookie: string | undefined):Promise<Permit | null> {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:4000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cookie}`,
      },
      body: JSON.stringify({query: `{validPermit {issueDate, expDate, type, price}}`}),
    })
    .then(response => { 
      if (response.status != 200) {
        reject('Unauthorized')
      }
      return response.json()} 
    )
    .then(json => {
      resolve(json.data.validPermit)
    })
    .catch((error) => reject(error))
  })
}
