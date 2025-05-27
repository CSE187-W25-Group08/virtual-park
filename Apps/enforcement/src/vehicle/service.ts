import { Vehicle } from "."

export async function getVehicleByPlate(cookie: string|undefined, plate: string): Promise<Vehicle>  {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:4020/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cookie}`,
      },
      body: JSON.stringify({
        query: `
          query ($plate: String!) {
            getVehicleByPlate(plate: $plate) {
              id
              licensePlate
              driver
              make
              model
              color
            }
          }
        `,
        variables: { plate: plate },
      }),
    })
    .then(response => {
      if (response.status != 200) {
        reject('Unauthorized')
        return
      }
      return response.json()} 
    )
    .then(json => {
      resolve(json.data.getVehicleByPlate)
    })
    .catch((error) => reject(error))
  })
}