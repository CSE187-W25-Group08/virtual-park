import { Lot, UpdateLotData } from "."

export class LotService {
  public async getLots(): Promise<Lot[]> {
    return new Promise((resolve, reject) => {
      fetch('http://localhost:4040/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: `{getAll {id, name, zone, address, latitude, longitude, capacity, availableSpots, isActive, type, created, updated}}` }),
      })
        .then(response => {
          if (response.status != 200) {
            reject('Unauthorized')
          }
          return response.json()
        }
        )
        .then(json => {
          resolve(json.data.getAll)
        })
        .catch(() => reject('Unauthorized'))
    })
  }

  public async updateLots(lotId: string, data: UpdateLotData): Promise<Lot> {

    const jsonString = JSON.stringify(data);
    console.log(jsonString);

    return new Promise((resolve, reject) => {
      fetch('http://localhost:4040/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: `mutation {
          putId(id: "${lotId}", data: {name: "Dragon", zone: "North"}) {
            id,
            name,
            zone, 
            address,
          }
        }` }),
      })
        .then(response => {
          if (response.status != 200) {
            reject('Unauthorized')
          }
          return response.json()
        }
        )
        .then(json => {
          resolve(json.data.putId)
        })
        .catch(() => reject('Unauthorized'))
    })
  }
}