export async function setTicketPaid(
  id: string,
  paid: boolean,
  cookie: string
): Promise<string> {
  return new Promise((resolve, reject) => {
    fetch("http://localhost:4010/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookie}`,
      },
      body: JSON.stringify({
        query: `
          mutation ($id: String!, $paid: Boolean!) {
            setTicketPaid(id: $id, paid: $paid) {
              paid
            }
          }
        `,
        variables: {
          id: id,
          paid: paid,
        },
      }),
    })
      .then((response) => {
        if (response.status !== 200) {
          return reject("Error creating checkout session");
        }
        return response.json();
      })
      .then((json) => {
        resolve(JSON.stringify(json.data.setTicketPaid));
      })
      .catch((error) => reject(error));
  });
}
