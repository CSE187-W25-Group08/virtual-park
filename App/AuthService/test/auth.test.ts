import { test, beforeAll, afterAll, expect } from 'vitest'
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