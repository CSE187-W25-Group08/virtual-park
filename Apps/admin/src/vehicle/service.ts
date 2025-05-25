import { Vehicle } from "./"

export class VehicleService {
  public async getUserVehicles(cookie: string | undefined): Promise<Vehicle[]> {
    return new Promise((resolve, reject) => {
      fetch('http://localhost:4020/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cookie}`,
        },
        body: JSON.stringify({ query: `{userVehicle {id, licensePlate, driver, make, model, color}}` }),
      })
        .then(response => {
          if (response.status != 200) {
            reject('Unauthorized')
          }
          return response.json()
        }
        )
        .then(json => {
          resolve(json.data.userVehicle)
        })
        .catch(() => reject('Unauthorized'))
    })
  }
  public async getVehiclePlate(cookie: string | undefined, id: string): Promise<Vehicle> {
    return new Promise((resolve, reject) => {
      fetch('http://localhost:4020/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cookie}`,
        },
        body: JSON.stringify({ query: `{getAnyVehicleById(id: "${id}") {id, licensePlate, driver, make, model, color}}` }),
      })
        .then(response => {
          if (response.status != 200) {
            reject('Unauthorized')
          }
          return response.json()
        }
        )
        .then(json => {
          resolve(json.data.getAnyVehicleById)
        })
        .catch((err) => {
          console.error('Fetch error:', err);
          reject('Unathorized');
        });
    })
  }
}