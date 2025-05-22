import {Permit} from './index'

export async function getPermitByPlate(cookie: string | undefined, carplate: string): Promise<Permit[]> {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:4000/graphql', {
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
    })
    .then(response => {
      if (response.status !== 200) {
        reject('Unauthorized')
        return
      }
      return response.json()
    })
    .then(json => {
      resolve(json.data.getPermitBycarPlate)
    })
    .catch((error) => reject(error))
  })
}