import { vi, test, beforeAll, afterAll, beforeEach, expect } from 'vitest'
import supertest from 'supertest'
import * as http from 'http'

import * as db from './db'
import { app, bootstrap } from '../src/app'

let server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>

beforeAll(async () => {
  server = http.createServer(app)
  await db.reset()
  await bootstrap()
})

afterAll(() => {
  db.shutdown()
  server.close
})

beforeEach(async () => {
  return db.reset()
})

vi.mock('../src/auth/service', () => {
  return {
    AuthService: class {
      async check() {
        return { id: 'bea45ed8-aa83-4c49-a201-4625baa0e91a' }
      }
    }
  }
})

const accessToken = "placeholder"

test('Get all permits', async () => {
  await supertest(server)
    .post('/graphql')
    .set('Authorization', 'Bearer ' + accessToken)
    .send({
      query: `{
        permits
        { licenseNumber, issueDate, expDate }
      }`
    })
    .then((res) => {
      expect(res.body.data.permits.length).toEqual(1)
      
    })
})
test('Permit contains price', async () => {
  await supertest(server)
    .post('/graphql')
    .set('Authorization', 'Bearer ' + accessToken)
    .send({
      query: `{
        permits
        { licenseNumber, issueDate, expDate, price}
      }`
    })
    .then((res) => {
      expect(res.body.data.permits[0].price).toEqual(3.14)
    })
})