import { Lot } from './index'

export async function getAllLots(): Promise<Lot[]> {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:4040/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${}`,
      },
      body: JSON.stringify({
        query: `
          query getallLots {
            getAll {
              id
              name
              zone
              address
              latitude
              longitude
              capacity
              availableSpots
              isActive
              type
              created
              updated
              validPermits
            }
          }
        `,
      }),
    })
      .then(response => {
        if (response.status !== 200) {
          reject('Unauthorized')
          return
        }
        return response.json()
      })
      .then(json => {
        // console.log("driver-parking get all lots", json.data.getAll[4])
        resolve(json.data.getAll)
      })
      .catch((error) => reject(error))
  })
}
