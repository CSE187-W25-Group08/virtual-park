import { NewUser, Authenticated, Credentials } from './'

export async function signupUser(user: NewUser): Promise<Authenticated | undefined> {
  try {
    const response = await fetch('http://localhost:3010/api/v0/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });

    if (response.status !== 201) {
      throw new Error(response.statusText);
    }

    return await response.json();
  } catch (error) {
    console.error('Signup failed:', error);
    return undefined;
  }
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

    return await response.json();
  }
  catch (error) {
    console.error('Authentication failed:', error);
    return undefined;
  }
}

export async function googleAuthenticate(credential: string): Promise<Authenticated | undefined> {
  const res = await fetch('http://localhost:3010/api/v0/auth/google-login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ token: credential })
  });

  if (res.ok) {
    const data = await res.json();
    console.log(data);
    return data;
  } else {
    return undefined;
  }
}

export async function check(cookie: string | undefined): Promise<void> {
  try {
    const response = await fetch('http://localhost:3010/api/v0/auth/check', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${cookie}`,
      }
    });

    if (response.status !== 200) {
      throw new Error('Unauthorized');
    }

    await response.json();
  } catch {
    return Promise.reject('Unauthorized');
  }
}
