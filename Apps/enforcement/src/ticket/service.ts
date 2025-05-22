import {Ticket} from './index'
export async function issueTicketForVehicle(
  cookie: string | undefined,
  driverID: string | null,
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
            $driverID: String,
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
          driverID: driverID || null,
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
      if (response.status != 200) {
        reject('Unauthorized')
        return
      }
      return response.json()
    })
    .then(json => {
      console.log('Ticket issue response:', json);
      return resolve(json.data.ticketIssue);
    })
    .catch((error) => reject(error))
  })
}
