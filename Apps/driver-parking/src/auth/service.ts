import 'server-only'

import { NewUser, Authenticated, Credentials} from './'

export async function signupUser(user: NewUser): Promise<Authenticated|undefined> {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:3010/api/v0/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
    .then(response => { 
      if (response.status != 201) {
        reject(response.statusText)
      }
      return response.json()} 
    )
    .then(data => resolve(data))
    .catch(error => reject(error))
  })
}

export async function authenticate(credentials: Credentials): Promise<Authenticated|undefined> {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:3010/api/v0/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })
    .then(response => { 
      if (response.status != 200) {
        reject('Unauthorized')
      }
      return response.json()} 
    )
    .then(data => resolve(data))
    .catch(() => reject('Unauthorized'))
  })
}