export async function unpaidTicketRegistrarCount(driverId: string): Promise<number> {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:4010/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query ($driverId: String!) {
            unpaidTicketCount(driverId: $driverId)
          }
        `,
        variables: {
          driverId: driverId,
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
      resolve(json.data.unpaidTicketCount);
    })
    .catch((error) => reject(error));
  });
}
