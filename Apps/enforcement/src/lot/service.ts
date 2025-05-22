import { Lot } from './index'

// export async function getAllLots(cookie: string | undefined): Promise<Lot[]> {
//   return new Promise((resolve, reject) => {
//     fetch('http://localhost:4040/graphql', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${cookie}`,
//       },
//       body: JSON.stringify({
//         query: `
//           query getallLots {
//             getAll {
//               id
//               name
//               zone
//               address
//               latitude
//               longitude
//               capacity
//               availableSpots
//               isActive
//               type
//               created
//               updated
//             }
//           }
//         `,
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
//       resolve(json.data.getAll)
//     })
//     .catch((error) => reject(error))
//   })
// }

export async function getAllLots(cookie: string | undefined): Promise<Lot[]> {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:4040/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cookie}`,
      },
      body: JSON.stringify({
        query: `
          query GetAllLots {
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
            }
          }
        `,
      }),
    })
    .then(response => {
      console.log('Response status:', response.status)
      if (response.status !== 200) {
        reject('Unauthorized')
        return
      }
      return response.json()
    })
    .then(json => {
      console.log('GraphQL Response:', JSON.stringify(json, null, 2))
      
      if (!json) {
        reject('Empty response from server')
        return
      }
      
      if (json.errors) {
        console.error('GraphQL Errors:', json.errors)
        reject(json.errors[0].message || 'GraphQL Error')
        return
      }
      
      if (!json.data) {
        reject('No data field in response')
        return
      }
      
      if (!json.data.getAll) {
        reject('No getAll field in response data')
        return
      }
      
      resolve(json.data.getAll)
    })
    .catch((error) => {
      console.error('Fetch error:', error)
      reject(error)
    })
  })
}

