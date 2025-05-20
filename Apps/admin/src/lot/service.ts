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

  // https://chatgpt.com/c/68261342-a478-800d-99f0-15b9a2aa6b13 conversion from Object to GraphQL string
  private helperObjToGraphql(obj: UpdateLotData) {
    return `{${Object.entries(obj)
      .map(([key, value]) => {
        if (typeof value === 'string') {
          // Escape double quotes and backslashes inside strings
          const escaped = value.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
          return `${key}: "${escaped}"`;
        } else {
          return `${key}: ${value}`;
        }
      })
      .join(', ')}}`;
  }

  public async updateLots(lotId: string, data: UpdateLotData): Promise<Lot> {

    const jsonString = this.helperObjToGraphql(data)
    console.log(jsonString);


    return new Promise((resolve, reject) => {
      fetch('http://localhost:4040/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `mutation {
          putId(id: "${lotId}", data: ${jsonString}) {
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

  public async getLotById(id: string): Promise<string> {
    return new Promise((resolve, reject) => {
      fetch('http://localhost:4040/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: `{getLotById(id: "${id}") {name}}` }),
      })
        .then(response => {
          return response.json()
        }
        )
        .then(json => {
          resolve(json.data.getLotById)
        })
        .catch(() => reject('Unknown Lot'))
    })
  }
}