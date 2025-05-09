import { vi, test, beforeAll, afterAll, expect } from 'vitest'
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
  server.close()
})

// beforeEach(async () => {
//   return db.reset()
// })

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

test('Get all permitType', async () => {
  await supertest(server)
    .post('/graphql')
    .set('Authorization', 'Bearer ' + accessToken)
    .send({
      query: `{
        PermitType {
          type
          price
        }
      }`
    })
    .then((res) => {
      console.log('dataPermit type:', res.body.data)
      expect(res.body.data.PermitType.length).toEqual(3)

    })
})
test('retrieve all the permits belong to the specific user', async () => {
  await supertest(server)
    .post('/graphql')
    .set('Authorization', 'Bearer ' + accessToken)
    .send({
      query: `{
        permitsByDriver {
          issueDate
          expDate
          type
        }
      }`
    })
    .then((res) => {
      if (res.body.errors) {
        console.error('GraphQL errors:', res.body.errors)
      }
      console.log('permit by user:', res.body.data)
      expect(res.body.data.permitsByDriver.length).toEqual(1)
    })
})