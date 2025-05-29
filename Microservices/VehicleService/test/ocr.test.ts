import { vi, test, beforeAll, afterAll, beforeEach, expect } from 'vitest'
import supertest from 'supertest'
import * as http from 'http'

import * as db from './db'
import { app, bootstrap } from '../src/app'

let server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>

const authserviceMock = vi.fn()

vi.mock('../src/auth/service', () => {
  return {
    AuthService: class {
      check = authserviceMock
      // async check() {
      // return { id: '45c90975-92e0-4a51-b5ea-2fe5f8613b54'}
      // }
    }
  }
})

beforeAll(async () => {
  server = http.createServer(app)
  await db.reset()
  await bootstrap()
})

afterAll(() => {
  db.shutdown()
  server.close()
})

beforeEach(async () => {
  authserviceMock.mockResolvedValue({ id: '45c90975-92e0-4a51-b5ea-2fe5f8613b54' })
  return db.reset()
})

