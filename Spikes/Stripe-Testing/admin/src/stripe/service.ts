
export async function getClientSecretService(amount: number):Promise<string> {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:4010/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({query: `      
        mutation {
          createPaymentIntent(amount: ${amount}) {
          clientSecret
        }
      }`}),
    })
    .then(response => { 
      if (response.status != 200) {
        return reject('Meow')
      }

      return response.json()} 
    )
    .then(json => {
      console.log(json)
      resolve(json.data.createPaymentIntent.clientSecret)
    })
    .catch((error) => reject(error))
  })
}