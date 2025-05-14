import { Lot } from "."

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
}