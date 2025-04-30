import { test, beforeAll, afterAll, beforeEach } from 'vitest'
import supertest from 'supertest'
import * as http from 'http'

import * as db from './db'
import app from '../src/app'

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

test('Attempt bad credential login', async () => {
  await supertest(server)
    .post('/api/v0/auth/login')
    .send({ email: tommy.email, password: "bad password" })
    .expect(401)
})

//   .post('/api/v0/login')
//   .send({ email: member.email, password: member.password })
//   .expect(200)
//   .then((res) => {
//     accessToken = res.body.accessToken
//   })
// return accessToken