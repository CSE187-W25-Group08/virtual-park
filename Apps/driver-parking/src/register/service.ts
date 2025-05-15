import { Vehicle, VehicleForm } from "."

export class RegisterService {
  public async getVehicleById(cookie: string|undefined, vehicleId: string): Promise<Vehicle>  {
    return new Promise((resolve, reject) => {
      fetch('http://localhost:4020/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cookie}`,
        },
        body: JSON.stringify({
          query: `
            query ($id: String!) {
              getVehicleById(id: $id) {
                id
                licensePlate
                driver
                make
                model
                color
              }
            }
          `,
          variables: { id: vehicleId },
        }),
      })
      .then(response => {
        if (response.status != 200) {
          reject('Unauthorized')
        }
        return response.json()} 
      )
      .then(json => {
        resolve(json.data.getVehicleById)
      })
      .catch(() => reject('Unauthorized'))
    })
  }

  public async getUserVehicles(cookie: string|undefined): Promise<Vehicle[]>  {
    return new Promise((resolve, reject) => {
      fetch('http://localhost:4020/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cookie}`,
        },
        body: JSON.stringify({query: `{userVehicle {id, licensePlate, driver, make, model, color, active}}`}),
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
      fetch('http://localhost:4020/graphql', {
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

  public async getPrimaryVehicle(cookie: string|undefined): Promise<Vehicle|undefined>  {
    return new Promise((resolve, reject) => {
      fetch('http://localhost:4020/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cookie}`,
        },
        body: JSON.stringify({query: `{primaryVehicle {id, licensePlate, driver, make, model, color}}`}),
      })
      .then(response => {
        if (response.status != 200) {
          reject('Unauthorized')
        }
        return response.json()} 
      )
      .then(json => {
        resolve(json.data.primaryVehicle)
      })
      .catch(() => reject('Unauthorized'))
    })
  }
}
