import { Vehicle } from "."

export async function getAllVehicles(cookie: string | undefined): Promise<Vehicle[]> {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:4020/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cookie}`,
      },
      body: JSON.stringify({ query: `{vehicle  {color, driver, id, licensePlate, make, model}` }),
    })
      .then(response => {
        if (response.status != 200) {
          reject('Unauthorized')
        }
        return response.json()
      }
      )
      .then(json => {
        resolve(json.data.vehicle)
      })
      .catch((error) => reject(error))
  })
}
