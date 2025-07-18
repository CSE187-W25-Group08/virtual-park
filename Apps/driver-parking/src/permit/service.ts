import {
  Permit,
  PermitType,
  // PermitIssue 
} from '.'

export async function getPermitByDriver(cookie: string | undefined): Promise<Permit[]> {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:4000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cookie}`,
      },
      body: JSON.stringify({ query: `{permitsByDriver {id, issueDate, expDate, type, price, permitClass}}` }),
    })
      .then(response => {
        if (response.status != 200) {
          reject('Unauthorized')
        }
        return response.json()
      }
      )
      .then(json => {
        // console.log("permits by user json", json, json.error);
        resolve(json.data.permitsByDriver)
      })
      .catch((error) => reject(error))
  })
}

export async function fetchBuyablePermits(cookie: string | undefined): Promise<Permit[]> {
  console.log("fetchBuyablePermits called")
  return new Promise((resolve, reject) => {
    fetch('http://localhost:4000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cookie}`,
      },
      body: JSON.stringify({
        query: `{
            buyablePermits {
              id
              type
              price
              permitClass
              purchased
            }
          }`
      }),
    })
      .then(response => {
        if (response.status != 200) {
          reject('Unauthorized')
        }
        return response.json()
      }
      )
      .then(json => {
        // console.log("buyable permits", json, "errors", json.error);
        resolve(json.data.buyablePermits)
      })
      .catch((error) => reject(error))
  })
}

export async function getPermitType(cookie: string | undefined): Promise<PermitType[]> {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:4000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cookie}`,
      },
      body: JSON.stringify({ query: `{PermitType {id, type, price, permitClass}}` }),
    })
      .then(response => {
        if (response.status != 200) {
          return reject('Unauthorized')
        }
        return response.json()
      }
      )
      .then(json => {
        // console.log("permits by type json", json, json.error);
        resolve(json.data.PermitType)
      })
      .catch((error) => reject(error))
  })
}

export async function getSpecificDailyPermit(cookie: string | undefined, driverClass: string): Promise<PermitType | null> {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:4000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cookie}`,
      },
      body: JSON.stringify({
        query: `
          query GetDailyPermitType($driverClass: String!) {
            getDailyPermitType(driverClass: $driverClass)
            {id, type, price, permitClass}
          }
        `,
        variables: {
          driverClass: driverClass,
        }
      }),
    })
      .then(response => {
        if (response.status != 200) {
          return reject('Unauthorized')
        }
        return response.json()
      })
      .then(json => {
        // console.log('JSON: ', json)
        resolve(json.data.getDailyPermitType)
      })
      .catch((err) => reject(err))
  })
}

export async function getValidPermit(cookie: string | undefined): Promise<Permit[] | null> {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:4000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cookie}`,
      },
      body: JSON.stringify({ query: `{validPermit {issueDate, expDate, type, price, permitClass}}` }),
    })
      .then(response => {
        if (response.status != 200) {
          reject('Unauthorized')
        }
        return response.json()
      }
      )
      .then(json => {
        resolve(json.data.validPermit)
      })
      .catch((error) => reject(error))
  })
}

export async function getFuturePermit(cookie: string | undefined): Promise<Permit[] | null> {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:4000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cookie}`,
      },
      body: JSON.stringify({ query: `{futurePermit {issueDate, expDate, type, price, permitClass}}` }),
    })
      .then(response => {
        if (response.status != 200) {
          reject('Unauthorized')
        }
        return response.json()
      }
      )
      .then(json => {
        resolve(json.data.futurePermit)
      })
      .catch((error) => reject(error))
  })
}
