export async function issuePermit(
  permitTypeId: string,
  vehicleId: string,
  cookie: string
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
          mutation ($permitTypeId: String!, $vehicleId: String!) {
            issuePermit(permitTypeId: $permitTypeId, vehicleId: $vehicleId) {
              id
              permitType {
                name
              }
              vehicle {
                licensePlate
              }
              issuedAt
              expiresAt
            }
          }
        `,
        variables: {
          permitTypeId,
          vehicleId,
        },
      }),
    })
      .then((response) => {
        if (response.status !== 200) {
          return reject("Error issuing permit");
        }
        return response.json();
      })
      .then((json) => {
        if (json.errors) {
          return reject(json.errors[0].message);
        }
        resolve(JSON.stringify(json.data.issuePermit));
      })
      .catch((error) => reject(error));
  });
}
