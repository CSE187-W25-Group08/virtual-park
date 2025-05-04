import { Vehicle, VehicleForm } from "."

export class RegisterService {
  public async getUserVehicles(cookie: string|undefined): Promise<Vehicle[]>  {
    return new Promise((resolve, reject) => {
      fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cookie}`,
        },
        body: JSON.stringify({query: `{userVehicle {id, licensePlate, driver, make, model, color}}`}),
      })
      .then(response => {
        if (response.status != 200) {
          reject('Unauthorized')
        }
        return response.json()} 
      )
      .then(json => {
        resolve(json.data.userVehicle)
      })
      .catch(() => reject('Unauthorized'))
    })
  }

  public async registerVehicle(cookie: string|undefined, vehicle: VehicleForm): Promise<Vehicle>  {
    return new Promise((resolve, reject) => {
      fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cookie}`,
        },
        body: JSON.stringify({
          query: `
            mutation {
              registerVehicle(input: {
                licensePlate: "${vehicle.licensePlate}",
                make: "${vehicle.make}",
                model: "${vehicle.model}",
                color: "${vehicle.color}"
              }) {
                id
                licensePlate
                make
                model
                color
                driver
              }
            }
          `
        })
      })
      .then(response => { 
        if (response.status != 200) {
          reject('Unauthorized')
        }
        return response.json()} 
      )
      .then(json => {
        resolve(json.data.registerVehicle)
      })
      .catch(() => reject('Unauthorized'))
    })
  }
}
