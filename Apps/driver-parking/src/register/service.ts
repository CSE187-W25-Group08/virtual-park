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
                color: "${vehicle.color}",
                vehicleType: "${vehicle.vehicleType}",
                active: ${vehicle.active}
              }) {
                id
                licensePlate
                make
                model
                color
                vehicleType
                driver
                active
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

  public async getPrimaryVehicle(cookie: string|undefined): Promise<Vehicle>  {
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

  public async updatePrimaryVehicle(cookie: string|undefined, vehicle: Vehicle): Promise<Vehicle>  {
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
              updatePrimaryVehicle(input: {
                id: "${vehicle.id}"
              }) {
                id
                licensePlate
                make
                model
                color
                vehicleType
                driver
                active
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
        resolve(json.data.updatePrimaryVehicle)
      })
      .catch(() => reject('Unauthorized'))
    })
  }

  public async editVehicle(cookie: string|undefined, vehicle: Vehicle | null): Promise<Vehicle>  {
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
              editVehicle(input: {
                id: "${vehicle?.id}",
                licensePlate: "${vehicle?.licensePlate}",
                make: "${vehicle?.make}",
                model: "${vehicle?.model}",
                color: "${vehicle?.color}",
                vehicleType: "${vehicle?.vehicleType}",
                active: ${vehicle?.active}
              }) {
                id
                licensePlate
                make
                model
                color
                driver
                active
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
        resolve(json.data.editVehicle)
      })
      .catch(() => reject('Unauthorized'))
    })
  }
}
