import { Enforcement } from '.'

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
