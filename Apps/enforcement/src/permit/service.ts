import {Permit} from './index'

// export async function getPermitByPlate(cookie: string | undefined, carplate: string): Promise<Permit[]> {
//   return new Promise((resolve, reject) => {
//     fetch('http://localhost:4000/graphql', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${cookie}`,
//       },
//       body: JSON.stringify({
//         query: `
//           query GetPermitByCar($input: String!) {
//             getPermitBycarPlate(input: $input) {
//               permitID
//               permitType
//               issueDate
//               expDate
//               isValid
//               driverID
//               vehicleID
//             }
//           }
//         `,
//         variables: {
//           input: carplate,
//         },
//       }),
//     })
//     .then(response => {
//       if (response.status !== 200) {
//         reject('Unauthorized')
//         return
//       }
//       return response.json()
//     })
//     .then(json => {
//       resolve(json.data.getPermitBycarPlate)
//     })
//     .catch((error) => reject(error))
//   })
// }
export async function getPermitByPlate(cookie: string | undefined, carplate: string): Promise<Permit[]> {
  const response = await fetch('http://localhost:4000/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${cookie}`,
    },
    body: JSON.stringify({
      query: `
        query GetPermitByCar($input: String!) {
          getPermitBycarPlate(input: $input) {
            permitID
            permitType
            issueDate
            expDate
            isValid
            driverID
            vehicleID
          }
        }
      `,
      variables: {
        input: carplate,
      },
    }),
  });
  const json = await response.json();
  if (json.errors || !json.data) {
    console.error("GraphQL Error:", json.errors);
    return [];
  }

  return json.data.getPermitBycarPlate ?? [];
}



export async function recognizePlateFromImage(cookie: string | undefined, base64Image: string): Promise<string> {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:4020/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cookie}`,
      },
      body: JSON.stringify({
        query: `
          mutation ScanImage($base64Image: String!) {
            scanImage(base64Image: $base64Image) {
              licensePlate
            }
          }
        `,
        variables: {
          base64Image
        }
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
      const plate = json?.data?.scanImage?.licensePlate;
      resolve(plate)
    })
    .catch((error) => {
      console.error('OCR service error:', error)
      reject('Failed to contact OCR service')
    })
  })
}

