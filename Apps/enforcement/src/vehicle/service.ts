import { Vehicle } from "."

// export async function getVehicleByPlate(cookie: string|undefined, plate: string): Promise<Vehicle>  {
//   return new Promise((resolve, reject) => {
//     fetch('http://localhost:4020/graphql', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${cookie}`,
//       },
//       body: JSON.stringify({
//         query: `
//           query ($plate: String!) {
//             getVehicleByPlate(plate: $plate) {
//               id
//               licensePlate
//               driver
//               make
//               model
//               color
//             }
//           }
//         `,
//         variables: { plate: plate },
//       }),
//     })
//     .then(response => {
//       if (response.status != 200) {
//         reject('Unauthorized')
//         return
//       }
//       return response.json()} 
//     )
//     .then(json => {
//       resolve(json.data.getVehicleByPlate)
//     })
//     .catch((error) => reject(error))
//   })
// }

export async function getVehicleByPlate(cookie: string|undefined, plate: string): Promise<Vehicle> {
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
      if (response.status !== 200) {
        reject(`HTTP Error: ${response.status}`)
        return
      }
      return response.json()
    })
    .then(json => {
      // ✅ Log the complete response to see GraphQL errors
      console.log('Complete GraphQL Response:', JSON.stringify(json, null, 2))
      
      // ✅ Check for GraphQL errors first
      if (json.errors && json.errors.length > 0) {
        console.error('GraphQL Errors:', json.errors)
        reject(json.errors[0].message)
        return
      }
      
      // ✅ Check if data is null
      if (!json.data) {
        console.error('Response data is null:', json)
        reject('No data returned from vehicle service')
        return
      }
      
      // ✅ Check if the specific field exists
      if (!json.data.getVehicleByPlate) {
        console.error('getVehicleByPlate field is null/undefined in:', json.data)
        reject(`Vehicle with license plate ${plate} not found`)
        return
      }
      
      resolve(json.data.getVehicleByPlate)
    })
    .catch((error) => {
      console.error('Vehicle fetch error:', error)
      reject(error)
    })
  })
}