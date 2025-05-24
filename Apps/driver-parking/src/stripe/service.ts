

export async function getCheckoutSessionUrl(
  cookie: string | undefined,
  amount: number,
  productName: string,
  successUrl: string,
  cancelUrl: string
): Promise<string> {
  console.log(successUrl);
  return new Promise((resolve, reject) => {
    fetch("http://localhost:4060/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookie}`,
      },
      body: JSON.stringify({
        query: `
      mutation ($amount: Int!, $name: String!, $successUrl: String!, $cancelUrl: String!) {
        createCheckoutSession(
          amount: $amount,
          name: $name,
          successUrl: $successUrl,
          cancelUrl: $cancelUrl
        )
      }
      `,
        variables: {
          amount,
          name: productName,
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
