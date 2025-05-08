import { NewUser, Authenticated, Credentials } from './'

export async function signupUser(user: NewUser): Promise<Authenticated | undefined> {
  const response = await fetch('http://localhost:3010/api/v0/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })

  if (response.status != 201) {
    throw new Error(response.statusText)
  }
  return await response.json();
}

export async function authenticate(credentials: Credentials): Promise<Authenticated | undefined> {
  const response = await fetch('http://localhost:3010/api/v0/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  })

  if (response.status != 200) {
    throw new Error(response.statusText)
  }
  return await response.json();
}

export async function check(cookie: string | undefined): Promise<void> {
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
        return response.json()
      }
      )
      .then(data => resolve(data))
      .catch(() => reject('Unauthorized'))
  })
}

