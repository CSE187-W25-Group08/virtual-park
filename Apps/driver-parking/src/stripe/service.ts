

export async function getCheckoutSessionUrl(
  cookie: string | undefined,
  amount: number, // cost of items in mad pennies
  name: string, // name of item (like daily monthy etc)
  metadata: Record<string, unknown>,
  successUrl: string,
  cancelUrl: string
): Promise<string> {



  return new Promise((resolve, reject) => {
    fetch("http://localhost:4060/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookie}`,
      },
      body: JSON.stringify({
        query: `
        mutation (
          $amount: Int!,
          $name: String!,
          $metadata: JSONObject!,
          $successUrl: String!,
          $cancelUrl: String!
        ) {
          createCheckoutSession(
            amount: $amount,
            name: $name,
            metadata: $metadata,
            successUrl: $successUrl,
            cancelUrl: $cancelUrl
          )
        }
      `,
        variables: {
          amount,
          name: name,
          metadata: {
            ...metadata,
            cookie: cookie || "", 
          },
          successUrl,
          cancelUrl,
        },
      }),
    })
      .then((response) => {
        if (response.status != 200) {
          return reject("Error creating checkout session");
        }

        return response.json();
      })
      .then((json) => {
        resolve(json.data.createCheckoutSession);
      })
      .catch((error) => reject(error));
  });
}
