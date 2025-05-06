import { Driver } from "."

export async function getAllDrivers(cookie: string | undefined): Promise<Driver[]> {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:3010/api/v0/auth/drivers', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cookie}`,
      },
    })
      .then(response => {
        if (response.status != 200) {
          reject('Unauthorized')
        }
        return response.json()
      }
      )
      .then(json => {
        resolve(json)
      })
      .catch((error) => reject(error))
  })
}
