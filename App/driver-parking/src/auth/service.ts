// import 'server-only'

import { NewUser, Authenticated, Credentials} from './'

export async function signupUser(user: NewUser): Promise<Authenticated|undefined> {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:3010/api/v0/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
    .then(response => { 
      if (response.status != 200) {
        reject('Email taken')
      }
      return response.json()} 
    )
    .then(data => resolve(data))
    .catch(() => reject('Email taken'))
  })
}

export async function authenticate(credentials: Credentials): Promise<Authenticated|undefined> {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:3010/api/v0/login', {
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