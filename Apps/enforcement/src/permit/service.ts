import {Permit} from './index'

export async function getPermitByPlate(cookie: string | undefined, carplate: string): Promise<Permit[]> {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:4000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cookie}`,
      },
      body: JSON.stringify({
        query: `
          query GetPermitByCar($input: String!) {
            getPermitBycarPlate(input: $input) {
              permitID
              permitType
              issueDate
              expDate
              isValid
              driverID
              vehicleID
            }
          }
        `,
        variables: {
          input: carplate,
        },
      }),
    })
    .then(response => {
      if (response.status !== 200) {
        reject('Unauthorized')
        return
      }
      return response.json()
    })
    .then(json => {
      resolve(json.data.getPermitBycarPlate)
    })
    .catch((error) => reject(error))
  })
}

export async function recognizePlateFromImage(cookie: string | undefined, base64Image: string): Promise<string> {
  // const apiKey = process.env.GOOGLE_VISION_API_KEY;

  // const response = await fetch(`https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({
  //     requests: [
  //       {
  //         image: { content: base64Image },
  //         features: [{ type: 'TEXT_DETECTION' }],
  //       },
  //     ],
  //   }),
  // });

  // const json = await response.json();
  // const plateText = json.responses?.[0]?.textAnnotations?.[2]?.description?.trim();
  // return plateText?.replace(/\s/g, '') || '';
  const response = await fetch('http://localhost:3011/api/v0/ocr/scan', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ base64Image }),
  });
  const json = await response.json();
  return json.licensePlate || 'failed';
}
