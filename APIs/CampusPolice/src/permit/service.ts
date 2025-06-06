// need to write endpoint that returns permit from plate
export async function checkPermitFromPlate(): Promise<boolean> {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:4000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query ($driverId: String!) {
            unpaidTicketPayrollCount(driverId: $driverId)
          }
        `,
        variables: {
          driverId: 'testing',
        },
      }),
    })
    .then(response => {
      if (response.status !== 200) {
        reject('Unauthorized');
      }
      return response.json();
    })
    .then(json => {
      resolve(json.data.unpaidTicketPayrollCount);
    })
    .catch((error) => reject(error));
  });
}
