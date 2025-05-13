import { vi, test, beforeAll, afterAll, expect, beforeEach } from 'vitest'
import supertest from 'supertest'
import * as http from 'http'

import * as db from './db'
import { app, bootstrap } from '../src/app'

let server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>

const AuthServiceMock= vi.fn()

beforeAll(async () => {
  server = http.createServer(app)
  await db.reset()
  await bootstrap()
})

afterAll(() => {
  db.shutdown()
  server.close()
})

vi.mock('../src/auth/service', () => {
  return {
    AuthService: class {
      check = AuthServiceMock
      // async check() {
      //   return { id: 'bea45ed8-aa83-4c49-a201-4625baa0e91a' }
      // }
    }
  }
})

beforeEach(() => {
  AuthServiceMock.mockReset()
})

const accessToken = "placeholder"

test('Get all permitType', async () => {
  AuthServiceMock.mockResolvedValue({id: 'bea45ed8-aa83-4c49-a201-4625baa0e91a'})
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
  AuthServiceMock.mockResolvedValue({id: 'bea45ed8-aa83-4c49-a201-4625baa0e91a'})
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
      expect(res.body.data.permitsByDriver.length).toEqual(2)
    })
})

test('retrieve the permit info based on the vehicle car plate', async () => {
  AuthServiceMock.mockResolvedValue({id: 'bea45ed8-aa83-4c49-a201-4625baa0e91a'})
  await supertest(server)
    .post('/graphql')
    .set('Authorization', 'Bearer ' + accessToken)
    .send({
      query: `
        query GetPermitByCar($input: String!) {
          getPermitBycarPlate(input: $input) {
            permitID
            permitType
            issueDate
            expDate
            isValid
          }
        }
      `,
      variables: {
        input: '123BC4A'
      }
    })
    .then((res) => {
      if (res.body.errors) {
        console.error('GraphQL errors:', res.body.errors)
      }
      console.log('permit by carPlate:', res.body.data)
      expect(res.body.data.getPermitBycarPlate.length).toEqual(2)
    })
})

test('should return empty array with not exist car plate number', async () => {
  AuthServiceMock.mockResolvedValue({id: 'bea45ed8-aa83-4c49-a201-4625baa0e91a'})
  await supertest(server)
    .post('/graphql')
    .set('Authorization', 'Bearer ' + accessToken)
    .send({
      query: `
        query GetPermitByCar($input: String!) {
          getPermitBycarPlate(input: $input) {
            permitID
            permitType
            issueDate
            expDate
            isValid
          }
        }
      `,
      variables: {
        input: '123BC1'
      }
    })
    .then((res) => {
      if (res.body.errors) {
        console.error('GraphQL errors:', res.body.errors)
      }
      console.log('permit by carPlate:', res.body.data)
      expect(res.body.data.getPermitBycarPlate.length).toEqual(0)
    })
})

test('should return 401 when auth service throws an error', async () => {
  AuthServiceMock.mockRejectedValue(new Error('Auth failed'))
  
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
      expect(res.body.errors).toBeDefined()
    })
  }
)
