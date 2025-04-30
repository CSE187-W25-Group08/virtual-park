import { test, beforeAll, afterAll } from 'vitest'
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

