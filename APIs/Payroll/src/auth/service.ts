export async function getUserIdFromEmail(email: string): Promise<string> {
  const url = `http://localhost:3010/api/v0/auth/id?email=${encodeURIComponent(email)}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status !== 200) {
      throw new Error("Error email: " + response.statusText);
    }

    const text = await response.text();

    if (!text) {
      throw new Error("Empty response body");
    }

    const cleaned = JSON.parse(text); // expect e.g. "1234"
    return cleaned;
  } catch  {
    throw new Error();
  }
}