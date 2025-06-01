export async function sendTicketAppealEmailRejected(
  email: string,
  name: string,
  ticketId: string,
  violation: string,
  cookie: string | undefined,
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
            $ticketId: String!,
            $violation: String!,
          ) {
            sendTicketAppealRejectedEmail(
              email: $email,
              name: $name,
              ticketId: $ticketId,
              violation: $violation,
            )
          }
        `,
        variables: {
          email,
          name,
          ticketId,
          violation
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
      })
      .catch((error) => reject(error));
  });
}



export async function sendTicketAppealEmailAccepted(
  email: string,
  name: string,
  ticketId: string,
  violation: string,
  cookie: string | undefined,
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
            $ticketId: String!,
            $violation: String!,
          ) {
            sendTicketAppealAcceptedEmail(
              email: $email,
              name: $name,
              ticketId: $ticketId,
              violation: $violation,
            )
          }
        `,
        variables: {
          email,
          name,
          ticketId,
          violation
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
      })
      .catch((error) => reject(error));
  });
}