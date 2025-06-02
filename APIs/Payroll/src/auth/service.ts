
export async function getUserIdFromEmail(
  email: string,
): Promise<string> {
  return new Promise((resolve, reject) => {
    const url = `http://localhost:3010/api/v0/auth/id?email=${encodeURIComponent(email)}`;

    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(response);
        if (response.status !== 200) {
          reject("Error sending email: " + response.statusText);
          return Promise.resolve(""); 
        }
        return response.text(); 
      })
      .then((text) => {
        console.log("Response text:", text);
        const cleaned = JSON.parse(text); // strips the quotes
        resolve(cleaned);
      })
      .catch((error) => reject(error));
  });
}