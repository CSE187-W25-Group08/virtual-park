import {Permit} from '.'

export async function getPermitByCarPlate(cookie: string | undefined):Promise<Permit[]> {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:4000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cookie}`,
      },
      body: JSON.stringify({query: `{getPermitBycarPlate {permitID, permitType, issueDate, expDate, isValid}}`}),
    })
    .then(response => { 
      if (response.status != 200) {
        reject('Unauthorized')
      }
      return response.json()} 
    )
    .then(json => {
      resolve(json.data.permitsByDriver)
    })
    .catch((error) => reject(error))
  })
}