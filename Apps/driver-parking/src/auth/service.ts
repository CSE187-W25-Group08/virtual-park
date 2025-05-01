import 'server-only'

import { NewUser, Authenticated, Credentials} from './'
import { rejects } from 'assert'

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
      if (response.status != 201) {
        reject(response.statusText)
      }
      return response.json()} 
    )
    .then(data => resolve(data))
    .catch(error => reject(error))
  })
}

export async function check(cookie: string|undefined): Promise<void> {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:3010/api/v0/auth/check', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${cookie}`,
      }
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

