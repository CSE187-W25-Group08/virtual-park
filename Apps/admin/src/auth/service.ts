// import 'server-only'

import { Authenticated, Credentials, UserContact } from './'

export async function check(cookie: string | undefined): Promise<void> {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:3010/api/v0/auth/check?scope=adminonly', {
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

export async function getDriverContactInfo(cookie: string | undefined, driverId: string): Promise<UserContact | undefined> {
  try {
    const res = await fetch(`http://localhost:3010/api/v0/auth/user?id=${driverId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cookie}`,
      },
    })

    console.log(res)

    if (res.status != 200) {
      throw new Error(res.statusText)
    }

    return await res.json()
  } catch (err) {
    console.error('Retrieval failed:', err)
    return undefined
  }
}

