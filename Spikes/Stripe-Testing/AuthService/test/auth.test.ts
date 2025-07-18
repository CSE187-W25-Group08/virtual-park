import { test, beforeAll, afterAll, beforeEach } from 'vitest'
import supertest from 'supertest'
import * as http from 'http'

import * as db from './db'
import app from '../src/app'
import { generateToken } from '../src/auth/authService'

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

export const badJWT = "7m#pK9@L!2xQ$5vR%8sT^1wU&3yV*6zW(4aX)9bY_0cZ+dA=eB-fC/gD|hEiF]jG[kH{lI}mJ~nK`oL'pM,qN.rO/sP0tQ1uR2vS3wT4xU5yV6zW7aX8bY9cZ0dA1eB2fC3gD4hE5iF6jG7kH8lI9mJ0nK1oL2pM3qN4rO5sP6tQ7uR8vS9wT"
export const badIdJWT = generateToken('483a70c3-7d24-4b45-bcc2-1589e624a483')

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
