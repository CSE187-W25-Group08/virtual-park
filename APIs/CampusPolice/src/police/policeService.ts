import { Permit } from '.';

export class PoliceService {
  public async hasValidAPIKey(): Promise<string> {
    return 'this works'
  }

  public async checkPermitFromPlate(licensePlate: string): Promise<Permit[]> {
    return new Promise((resolve, reject) => {
      fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            query GetPermitByPlate($input: String!) {
              getPermitByPlateAPI(input: $input) {
                isValid
              }
            }
          `,
          variables: {
            input: licensePlate,
          },
        }),
      })
      .then(response => {
        return response.json()
      })
      .then(json => {
        resolve(json.data.getPermitByPlateAPI)
      })
      .catch((error) => reject(error))
    })
  }
}