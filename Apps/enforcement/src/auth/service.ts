// import 'server-only'

import { Authenticated, Credentials, Driver } from './'

export async function check(cookie: string | undefined): Promise<void> {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:3010/api/v0/auth/enforcementCheck?scope=enforcementonly', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${cookie}`,
      }
    })
      .then(response => {
        if (response.status != 200) {
          reject('Unauthorized')
        }
        return response.json()
      }
      )
      .then(data => resolve(data))
      .catch(() => reject('Unauthorized'))
  })
}

export async function authenticate(credentials: Credentials): Promise<Authenticated | undefined> {
  try {
    const response = await fetch('http://localhost:3010/api/v0/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });

    if (response.status !== 200) {
      throw new Error(response.statusText);
    }

    const data: Authenticated = await response.json();

    // Now verify that the token belongs to an admin
    await check(data.accessToken); // Will throw if not admin

    return data; // Return only if admin check passed
  } catch (err) {
    console.error("Authentication failed:", err);
    return undefined;
  }
}

export async function getDriver(id: string, cookie: string | undefined): Promise<Driver | undefined> {
  return new Promise((resolve, reject) => {
    fetch(`http://localhost:3010/api/v0/auth/user?id=${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${cookie}`,
      }
    })
      .then(response => {
        if (response.status != 200) {
          reject(response.statusText)
        }
        return response.json()
      }
      )
      .then(data => resolve(data))
      .catch((error) => reject(error))
  })
}

