import { UnregisterVeh, Vehicle } from "."

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
      // if (json.errors) {
      //   reject(json.errors[0].message)
      //   return
      // }
      resolve(json.data.getVehicleByPlate)
    })
    .catch((error) => reject(error))
  })
}

export async function UnregisterVehicle(cookie: string|undefined, plate: string): Promise<UnregisterVeh> {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:4020/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cookie}`,
      },
      body: JSON.stringify({
        query: `
          mutation ($input: String!) {
            UnregisterVehicle(input: $input) {
              id
              licensePlate
            }
          }
        `,
        variables: { input: plate },
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
      // if (json.errors) {
      //   reject(json.errors[0].message)
      //   return
      // }
      resolve(json.data.UnregisterVehicle)
    })
    .catch((error) => reject(error))
  })
}

export async function getVehicle(cookie: string|undefined, driver: string, plate: string): Promise<string | null>  {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:4020/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cookie}`,
      },
      body: JSON.stringify({
        query: `
          query ($driver: String!, $plate: String!) {
            getVehicleByDriverOrPlate(driver: $driver, plate: $plate) {
              id
              licensePlate
              driver
              make
              model
              color
            }
          }
        `,
        variables: { driver, plate },
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
      const vehicle = json.data?.getVehicleByDriverOrPlate;
      resolve(vehicle ? vehicle.id : null);
    })
    .catch((error) => reject(error))
  })
}