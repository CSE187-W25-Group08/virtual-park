export async function sendPermitEmail(
  email: string,
  name: string,
  nameOfProduct: string,
  costOfProduct: number,
  cookie: string,
  vehicleId: string,
  permitTypeId: string
): Promise<string> {
  return new Promise((resolve, reject) => {
    fetch("http://localhost:4070/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookie}`,
      },
      body: JSON.stringify({
                query: `
          mutation SendPermitPaymentEmail(
            $email: String!,
            $name: String!,
            $nameOfProduct: String!,
            $costOfProduct: Float!,
            $vehicleId: String!,
            $permitTypeId: String!,
          ) {
            sendPermitPaymentEmail(
              email: $email,
              name: $name,
              nameOfProduct: $nameOfProduct,
              costOfProduct: $costOfProduct,
              vehicleId: $vehicleId,
              permitTypeId: $permitTypeId
            )
          }
        `,
        variables: {
          email,
          name,
          nameOfProduct,
          costOfProduct,
          vehicleId, 
          permitTypeId
        },
      }),
    })
      .then((response) => {
        console.log(response)
        if (response.status !== 200) {
          return reject("Error sending email: " + response.statusText);
        }
        return response.json();
      })
      .then((json) => {
        console.log(json)
        if (json.errors) {
          return reject(json.errors[0].message);
        }
        resolve(JSON.stringify(json.data.issuePermit));
      })
      .catch((error) => reject(error));
  });
}


export async function sendTicketEmail(
  email: string,
  name: string,
  nameOfProduct: string,
  costOfProduct: number,
  cookie: string,
  ticketId: string,
): Promise<string> {
  return new Promise((resolve, reject) => {
    fetch("http://localhost:4070/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookie}`,
      },
      body: JSON.stringify({
                query: `
          mutation (
            $email: String!,
            $name: String!,
            $nameOfProduct: String!,
            $costOfProduct: Float!,
            $ticketId: String!,
          ) {
            sendTicketPaymentEmail(
              email: $email,
              name: $name,
              nameOfProduct: $nameOfProduct,
              costOfProduct: $costOfProduct,
              ticketId: $ticketId
            )
          }
        `,
        variables: {
          email,
          name,
          nameOfProduct,
          costOfProduct,
          ticketId
        },
      }),
    })
      .then((response) => {
        console.log(response)
        if (response.status !== 200) {
          return reject("Error sending email: " + response.statusText);
        }
        return response.json();
      })
      .then((json) => {
        console.log(json)
        if (json.errors) {
          return reject(json.errors[0].message);
        }
        resolve(JSON.stringify(json.data.issuePermit));
      })
      .catch((error) => reject(error));
  });
}
