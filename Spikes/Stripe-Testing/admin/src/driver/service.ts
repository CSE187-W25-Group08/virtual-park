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

// export async function suspendDriverAccount(email: string, cookie: string | undefined): Promise<void> {
//   return new Promise((resolve, reject) => {
//     fetch('http://localhost:3010/api/v0/auth/suspend', {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${cookie}`,
//       },
//       body: JSON.stringify({ email })
//     })
//       .then(response => {
//         if (response.status != 204) {
//           reject('Unauthorized')
//         }
//         resolve()
//       })
//       .catch((error) => reject(error))
//   })
// }

// export async function reactivateDriverAccount(email: string, cookie: string | undefined): Promise<void> {
//   return new Promise((resolve, reject) => {
//     fetch('http://localhost:3010/api/v0/auth/reactivate', {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${cookie}`,
//       },
//       body: JSON.stringify({ email })
//     })
//       .then(response => {
//         if (response.status != 204) {
//           reject('Unauthorized')
//         }
//         resolve()
//       })
//       .catch((error) => reject(error))
//   })
// }
