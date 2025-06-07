import { test, beforeAll, afterAll, beforeEach, expect, vi } from 'vitest'
import supertest from 'supertest'
import * as http from 'http'
import jwt from 'jsonwebtoken'

import * as db from './db'
import app from '../src/app'
import { generateToken } from '../src/auth/authService'

vi.mock('google-auth-library', () => ({
  OAuth2Client: vi.fn().mockImplementation(() => ({
    verifyIdToken: vi.fn()
  }))
}))

import { OAuth2Client } from 'google-auth-library'

let server: http.Server<
  typeof http.IncomingMessage,
  typeof http.ServerResponse
>

beforeAll(async () => {
  server = http.createServer(app)
  server.listen()
  return db.reset()
})

afterAll(() => {
  db.shutdown()
  server.close()
})

// investiage db.reset() in CI pipeline
beforeEach(async () => {
  await db.reset();
})

export interface Member {
  email: string
  password: string
  name: string
}

export const anna = {
  email: 'anna@books.com',
  password: 'annaadmin',
  name: "Anna Admin",
}

const tommy = {
  email: "tommy@books.com",
  password: "tommytimekeeper",
  name: "Tommy Timekeeper",
}

const edna = {
  email: 'edma@enforcement.com',
  password: 'ednaenforcement',
  name: "Edna Enforcer",
  enforcementId: 'ABC-1234',
}

export const badJWT = "7m#pK9@L!2xQ$5vR%8sT^1wU&3yV*6zW(4aX)9bY_0cZ+dA=eB-fC/gD|hEiF]jG[kH{lI}mJ~nK`oL'pM,qN.rO/sP0tQ1uR2vS3wT4xU5yV6zW7aX8bY9cZ0dA1eB2fC3gD4hE5iF6jG7kH8lI9mJ0nK1oL2pM3qN4rO5sP6tQ7uR8vS9wT"
export const badIdJWT = generateToken('483a70c3-7d24-4b45-bcc2-1589e624a483')

// https://claude.ai/chat/392a7b28-68b3-4771-8385-130dffae74f5
const mockOAuth2Client = () => {
  const mockVerifyIdToken = vi.fn()
  const MockedOAuth2Client = OAuth2Client as unknown as vi.MockedClass<typeof OAuth2Client>
  MockedOAuth2Client.mockImplementation(() => ({
    verifyIdToken: mockVerifyIdToken
  }))
  return mockVerifyIdToken
}

// ... your existing tests ...

test('google-login with valid token for existing user', async () => {
  const mockVerifyIdToken = mockOAuth2Client()

  // Mock successful token verification
  mockVerifyIdToken.mockResolvedValue({
    getPayload: () => ({
      email: anna.email,
      name: anna.name,
      sub: 'google-user-id-123'
    })
  })

  const res = await supertest(server)
    .post('/api/v0/auth/google-login')
    .send({ token: 'valid-google-token' })
    .expect(200)

  expect(res.body).toHaveProperty('accessToken')
  expect(res.body.email).toBe(anna.email)
  expect(res.body.name).toBe(anna.name)
})

test('google-login with valid token for new user', async () => {
  const mockVerifyIdToken = mockOAuth2Client()

  const newUser = {
    email: 'newuser@gmail.com',
    name: 'New Google User'
  }

  // Mock successful token verification
  mockVerifyIdToken.mockResolvedValue({
    getPayload: () => ({
      email: newUser.email,
      name: newUser.name,
      sub: 'google-user-id-456'
    })
  })

  const res = await supertest(server)
    .post('/api/v0/auth/google-login')
    .send({ token: 'valid-google-token-new-user' })
    .expect(200)

  expect(res.body).toHaveProperty('accessToken')
  expect(res.body.email).toBe(newUser.email)
  expect(res.body.name).toBe(newUser.name)

  // Verify the access token is valid
  const decoded = jwt.verify(res.body.accessToken, `${process.env.MASTER_SECRET}`) as { id: string }
  expect(decoded.id).toBeTruthy()
})

test('google-login returns 401 for invalid token', async () => {
  const mockVerifyIdToken = mockOAuth2Client()

  // Mock token verification failure
  mockVerifyIdToken.mockRejectedValue(new Error('Invalid token'))

  const res = await supertest(server)
    .post('/api/v0/auth/google-login')
    .send({ token: 'invalid-google-token' })
    .expect(401)

  expect(res.body).toEqual({})
})

test('Serves API Docs', async () => {
  await supertest(server)
    .get('/api/v0/docs/')
    .expect(200)
    .expect('Content-Type', /text\/html/);
});

test('Errors on GET Invalid URL', async () => {
  await supertest(server)
    .get('/api/v0/so-not-a-real-end-point')
    .expect(404);
});

test('Sign Up as tommy', async () => {
  await supertest(server)
    .post('/api/v0/auth/signup')
    .send(tommy)
    .expect(201)
})

test('Sign Up with now password expect rejection', async () => {
  await supertest(server)
    .post('/api/v0/auth/signup')
    .send({ email: "nopw@books.com", name: "Tommy Timekeeper" })
    .expect(409)
})

test('Sign Up twice as tommy throws 409', async () => {
  await supertest(server)
    .post('/api/v0/auth/signup')
    .send(tommy)
  await supertest(server)
    .post('/api/v0/auth/signup')
    .send(tommy)
    .expect(409)
})

test('Sign Up and login as tommy', async () => {
  await supertest(server)
    .post('/api/v0/auth/signup')
    .send(tommy)
  await supertest(server)
    .post('/api/v0/auth/login')
    .send({ email: tommy.email, password: tommy.password })
    .expect(200)
})

test('login as anna', async () => {
  await supertest(server)
    .post('/api/v0/auth/login')
    .send({ email: anna.email, password: anna.password })
    .expect(200)
})

test('Attempt bad credential login', async () => {
  await supertest(server)
    .post('/api/v0/auth/login')
    .send({ email: tommy.email, password: "bad password" })
    .expect(401)
})

test('Sign Up then check access token', async () => {
  let accessToken;
  await supertest(server)
    .post('/api/v0/auth/signup')
    .send(tommy)
    .then((res) => {
      accessToken = res.body.accessToken
    })
  await supertest(server)
    .get('/api/v0/auth/check')
    .set('Authorization', 'Bearer ' + accessToken)
    .expect(200)
})

test('Login then check access token', async () => {
  let accessToken;
  await supertest(server)
    .post('/api/v0/auth/signup')
    .send(tommy)
  await supertest(server)
    .post('/api/v0/auth/login')
    .send({ email: tommy.email, password: tommy.password })
    .then((res) => {
      accessToken = res.body.accessToken
    })
  await supertest(server)
    .get('/api/v0/auth/check')
    .set('Authorization', 'Bearer ' + accessToken)
    .expect(200)
})

test('google-login returns 401 for token without email', async () => {
  const mockVerifyIdToken = mockOAuth2Client()

  // Mock token verification with missing email
  mockVerifyIdToken.mockResolvedValue({
    getPayload: () => ({
      name: 'User Without Email',
      sub: 'google-user-id-789'
      // email is missing
    })
  })

  const res = await supertest(server)
    .post('/api/v0/auth/google-login')
    .send({ token: 'token-without-email' })
    .expect(401)

  expect(res.body).toEqual({})
})

test('google-login returns 401 for token without name', async () => {
  const mockVerifyIdToken = mockOAuth2Client()

  // Mock token verification with missing name
  mockVerifyIdToken.mockResolvedValue({
    getPayload: () => ({
      email: 'user@gmail.com',
      sub: 'google-user-id-101'
      // name is missing
    })
  })

  const res = await supertest(server)
    .post('/api/v0/auth/google-login')
    .send({ token: 'token-without-name' })
    .expect(401)

  expect(res.body).toEqual({})
})

test('google-login returns 401 for token with no payload', async () => {
  const mockVerifyIdToken = mockOAuth2Client()

  // Mock token verification with null payload
  mockVerifyIdToken.mockResolvedValue({
    getPayload: () => null
  })

  const res = await supertest(server)
    .post('/api/v0/auth/google-login')
    .send({ token: 'token-with-no-payload' })
    .expect(401)

  expect(res.body).toEqual({})
})


test('check bad access token', async () => {
  await supertest(server)
    .get('/api/v0/auth/check')
    .set('Authorization', 'Bearer ' + badJWT)
    .expect(401)
})

test('check bad id access token', async () => {
  await supertest(server)
    .get('/api/v0/auth/check')
    .set('Authorization', 'Bearer ' + badIdJWT)
    .expect(401)
})

test('check with no access token', async () => {
  await supertest(server)
    .get('/api/v0/auth/check')
    .expect(401)
})


test('admin check as non-admin', async () => {
  let accessToken;
  await supertest(server)
    .post('/api/v0/auth/signup')
    .send(tommy)
    .then((res) => {
      accessToken = res.body.accessToken
    })
  await supertest(server)
    .get('/api/v0/auth/check?scope=adminonly')
    .set('Authorization', 'Bearer ' + accessToken)
    .expect(401)
})

test('admin check as admin', async () => {
  let accessToken;
  await supertest(server)
    .post('/api/v0/auth/login')
    .send({ email: anna.email, password: anna.password })
    .then((res) => {
      accessToken = res.body.accessToken
    })
  await supertest(server)
    .get('/api/v0/auth/check?scope=adminonly')
    .set('Authorization', 'Bearer ' + accessToken)
    .expect(200)
})

test('Get drivers as admin', async () => {
  await supertest(server)
    .post('/api/v0/auth/signup')
    .send(tommy)
  let accessToken;
  await supertest(server)
    .post('/api/v0/auth/login')
    .send({ email: anna.email, password: anna.password })
    .then((res) => {
      accessToken = res.body.accessToken
    })
  await supertest(server)
    .get('/api/v0/auth/drivers')
    .set('Authorization', 'Bearer ' + accessToken)
    .expect(200)
})

test('Get drivers as non-admin', async () => {
  let accessToken;
  await supertest(server)
    .post('/api/v0/auth/signup')
    .send(tommy)
    .then((res) => {
      accessToken = res.body.accessToken
    })
  await supertest(server)
    .get('/api/v0/auth/drivers')
    .set('Authorization', 'Bearer ' + accessToken)
    .expect(401)
})

test('Suspend driver tommy', async () => {
  let accessToken;
  await supertest(server)
    .post('/api/v0/auth/signup')
    .send(tommy)
  await supertest(server)
    .post('/api/v0/auth/login')
    .send({ email: anna.email, password: anna.password })
    .then((res) => {
      accessToken = res.body.accessToken
    })
  await supertest(server)
    .put('/api/v0/auth/suspend')
    .set('Authorization', 'Bearer ' + accessToken)
    .send({ email: tommy.email })
    .expect(204)
})

test('Reactivate driver tommy', async () => {
  let accessToken;
  await supertest(server)
    .post('/api/v0/auth/signup')
    .send(tommy)
  await supertest(server)
    .post('/api/v0/auth/login')
    .send({ email: anna.email, password: anna.password })
    .then((res) => {
      accessToken = res.body.accessToken
    })
  await supertest(server)
    .put('/api/v0/auth/reactivate')
    .set('Authorization', 'Bearer ' + accessToken)
    .send({ email: tommy.email })
    .expect(204)
})

test('Create new enforcement officer', async () => {
  let accessToken;
  await supertest(server)
    .post('/api/v0/auth/login')
    .send({ email: anna.email, password: anna.password })
    .then((res) => {
      accessToken = res.body.accessToken
    })
  await supertest(server)
    .post('/api/v0/auth/enforcement')
    .set('Authorization', 'Bearer ' + accessToken)
    .send(edna)
    .expect(201)
})

test('Don\'t let non-admins create enforcement officer accounts', async () => {
  let accessToken;
  await supertest(server)
    .post('/api/v0/auth/signup')
    .send(tommy)
    .then((res) => {
      accessToken = res.body.accessToken
    })

  await supertest(server)
    .post('/api/v0/auth/enforcement')
    .set('Authorization', 'Bearer ' + accessToken)
    .send(edna)
    .expect(401)
})

test('Cannot create the same enforcement officer twice', async () => {
  let accessToken
  await supertest(server)
    .post('/api/v0/auth/login')
    .send({ email: anna.email, password: anna.password })
    .then((res) => {
      accessToken = res.body.accessToken
    })

  await supertest(server)
    .post('/api/v0/auth/enforcement')
    .set('Authorization', 'Bearer ' + accessToken)
    .send(edna)
    .expect(201)

  await supertest(server)
    .post('/api/v0/auth/enforcement')
    .set('Authorization', 'Bearer ' + accessToken)
    .send(edna)
    .expect(409)
})

test('Get enforcement officers', async () => {
  let accessToken
  await supertest(server)
    .post('/api/v0/auth/login')
    .send({ email: anna.email, password: anna.password })
    .then((res) => {
      accessToken = res.body.accessToken
    })

  await supertest(server)
    .get('/api/v0/auth/enforcement')
    .set('Authorization', 'Bearer ' + accessToken)
    .then((res) => {
      expect(res.body.length).toEqual(1)
    })
})

test('Must be an admin to fetch enforcement officers', async () => {
  let accessToken;
  await supertest(server)
    .post('/api/v0/auth/signup')
    .send(tommy)
    .then((res) => {
      accessToken = res.body.accessToken
    })

  await supertest(server)
    .get('/api/v0/auth/enforcement')
    .set('Authorization', 'Bearer ' + accessToken)
    .expect(401)
})

test('Get Anna by ID', async () => {
  let accessToken
  await supertest(server)
    .post('/api/v0/auth/login')
    .send({ email: anna.email, password: anna.password })
    .then((res) => {
      accessToken = res.body.accessToken
    })
  await supertest(server)
    .get(`/api/v0/auth/user?id=03845709-4d40-45fe-9e51-11789f6f209a`)
    .set('Authorization', 'Bearer ' + accessToken)
    .expect(200)
})

test('Get Nick by ID', async () => {
  let accessToken
  await supertest(server)
    .post('/api/v0/auth/login')
    .send({ email: 'nick@books.com', password: 'nickenforcement' })
    .then((res) => {
      accessToken = res.body.accessToken
    })
  await supertest(server)
    .get(`/api/v0/auth/user?id=03845709-4d40-45fe-9e51-11789f6f119b`)
    .set('Authorization', 'Bearer ' + accessToken)
    .expect(200)
})

test('Drivers cannot access /user endpoint', async () => {
  let accessToken
  await supertest(server)
    .post('/api/v0/auth/signup')
    .send(tommy)
  await supertest(server)
    .post('/api/v0/auth/login')
    .send({ email: tommy.email, password: tommy.password })
    .then((res) => {
      accessToken = res.body.accessToken
    })
  const uid = jwt.verify(accessToken, `${process.env.MASTER_SECRET}`) as { id: string }
  await supertest(server)
    .get(`/api/v0/auth/user?id=${uid.id}`)
    .set('Authorization', 'Bearer ' + accessToken)
    .expect(401)
})

test('Get nonexistent user by ID', async () => {
  let accessToken
  await supertest(server)
    .post('/api/v0/auth/login')
    .send({ email: anna.email, password: anna.password })
    .then((res) => {
      accessToken = res.body.accessToken
    })
  await supertest(server)
    .get(`/api/v0/auth/user?id=483a70c3-7d24-4b45-bcc2-1589e624a483`)
    .set('Authorization', 'Bearer ' + accessToken)
    .expect(404)
})


test('User logged in can retrieve their info', async () => {
  let accessToken
  await supertest(server)
    .post('/api/v0/auth/signup')
    .send(tommy)
  await supertest(server)
    .post('/api/v0/auth/login')
    .send({ email: tommy.email, password: tommy.password })
    .then((res) => {
      accessToken = res.body.accessToken
    })
  const res = await supertest(server)
    .get(`/api/v0/auth/driverinfo`)
    .set('Authorization', 'Bearer ' + accessToken)
    .expect(200)

  console.log(res.body)
})


test('Payroll/Registrar can retrieve their id', async () => {
  const res = await supertest(server)
    .get('/api/v0/auth/id?email=anna@books.com')
  console.log(res.body)
})

test('enforcementCheck passes for enforcement role', async () => {
  // Admin creates enforcement officer
  let adminToken;
  await supertest(server)
    .post('/api/v0/auth/login')
    .send({ email: anna.email, password: anna.password })
    .then(res => adminToken = res.body.accessToken);

  await supertest(server)
    .post('/api/v0/auth/enforcement')
    .set('Authorization', 'Bearer ' + adminToken)
    .send(edna)
    .expect(201);

  // Officer logs in
  let enforcementToken;
  await supertest(server)
    .post('/api/v0/auth/login')
    .send({ email: edna.email, password: edna.password })
    .then(res => enforcementToken = res.body.accessToken);

  await supertest(server)
    .get('/api/v0/auth/enforcementCheck?scope=enforcementonly')
    .set('Authorization', 'Bearer ' + enforcementToken)
    .expect(200);
});

test('enforcementCheck sets 401 and returns empty body for non-enforcement user', async () => {
  // Sign up and log in as regular driver
  let token;
  await supertest(server)
    .post('/api/v0/auth/signup')
    .send(tommy);

  await supertest(server)
    .post('/api/v0/auth/login')
    .send({ email: tommy.email, password: tommy.password })
    .then(res => token = res.body.accessToken);

  const res = await supertest(server)
    .get('/api/v0/auth/enforcementCheck?scope=enforcementonly')
    .set('Authorization', `Bearer ${token}`)
    .expect(401);

  // Confirm body is empty
  expect(res.body).toEqual({});
});

test('driverinfo returns 401 if requester is not a driver', async () => {
  // Admin logs in
  let token;
  await supertest(server)
    .post('/api/v0/auth/login')
    .send({ email: anna.email, password: anna.password })
    .then(res => token = res.body.accessToken);

  const res = await supertest(server)
    .get('/api/v0/auth/driverinfo')
    .set('Authorization', `Bearer ${token}`)
    .expect(401);

  expect(res.body).toEqual({});
});

