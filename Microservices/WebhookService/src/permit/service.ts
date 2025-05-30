export async function issuePermit(
  permitTypeId: string,
  vehicleId: string,
  cookie: string,
  price: number
): Promise<string> {
  return new Promise((resolve, reject) => {
    fetch("http://localhost:4000/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookie}`,
      },
      body: JSON.stringify({
        query: `
          mutation ($permitTypeId: String!, $vehicleId: String!, $price: Float!) {
            issuePermit(permitTypeId: $permitTypeId, vehicleId: $vehicleId, price: $price) {
              driverID
              vehicleID
              permitType
              issueDate
              expDate
              isValid

            }
          }
        `,
        variables: {
          permitTypeId,
          vehicleId,
          price,
        },
      }),
    })
      .then((response) => {
        console.log(response)
        if (response.status !== 200) {
          return reject("Error issuing permit");
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
