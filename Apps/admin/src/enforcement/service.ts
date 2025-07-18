import { Enforcement, NewEnforcement } from '.'

export async function getEnforcementOfficers(cookie: string | undefined): Promise<Enforcement[]> {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:3010/api/v0/auth/enforcement', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer: ${cookie}`,
      },
    })
    .then(res => {
      if (res.status != 200) {
        reject('Unauthorized')
      }
      return res.json()
    })
    .then(json => {
      resolve(json)
    })
    .catch((err) => {
      reject(err)
    })
  })
}

export async function createEnforcementOfficer(cookie: string | undefined, details: NewEnforcement): Promise<Enforcement | undefined> {
  try {
    const res = await fetch('http://localhost:3010/api/v0/auth/enforcement', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cookie}`,
      },
      body: JSON.stringify(details),
    })

    if (res.status != 201) {
      throw new Error(res.statusText)
    }

    return await res.json()
  } catch (err) {
    console.error('Creation failed:', err)
    return undefined
  }
}
