import {Permit, Ticket} from './index'

export async function getPermitByPlate(cookie: string | undefined, carplate: string): Promise<Permit[]> {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:4000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cookie}`,
      },
      body: JSON.stringify({
        query: `
          query GetPermitByCar($input: String!) {
            getPermitBycarPlate(input: $input) {
              permitID
              permitType
              issueDate
              expDate
              isValid
              driverID
              vehicleID
            }
          }
        `,
        variables: {
          input: carplate,
        },
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
      if (json.errors) {
        reject(json.errors)
      } else {
        resolve(json.data.getPermitBycarPlate)
      }
    })
    .catch((error) => reject(error))
  })
}

export async function issueTicketForVehicle(
  cookie: string | undefined,
  driverID: string,
  vehicleID: string,
  lot: string,
  description: string,
  violation: string,
  image: string,
  cost: number,
  paid: boolean
): Promise<Ticket> {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:4010/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cookie}`,
      },
      body: JSON.stringify({
        operationName: "IssueTicket",
        query: `
          mutation IssueTicket(
            $driverID: String!,
            $vehicleID: String!,
            $lot: String!,
            $paid: Boolean!,
            $description: String!,
            $violation: String!,
            $image: String!,
            $cost: Float!
          ) {
            ticketIssue(
              driverID: $driverID,
              vehicleID: $vehicleID,
              lot: $lot,
              paid: $paid,
              description: $description,
              violation: $violation,
              image: $image,
              cost: $cost
            ) {
              id
              vehicle
              enforcer
              lot
              paid
              description
              due
              issue
              violation
              image
              cost
              appeal
              appealReason
            }
          }
        `,
        variables: {
          driverID,
          vehicleID,
          lot,
          paid,
          description,
          violation,
          image,
          cost
        },
      }),
    })
    .then(response => {
      if (response.status !== 200) {
        return response.text().then(text => {
          throw new Error(`Server error: ${response.status} - ${text}`);
        });
      }
      return response.json();
    })
    .then(json => {
      console.log('Ticket issue response:', json);
      return resolve(json.data.ticketIssue);
    })
    .catch((error) => reject(error))
  })
}
