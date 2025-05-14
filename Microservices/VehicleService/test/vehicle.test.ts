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
  authserviceMock.mockResolvedValue({id: '45c90975-92e0-4a51-b5ea-2fe5f8613b54'})
  return db.reset()
})

test('Returns all vehicles', async () => {
  await supertest(server)
    .post('/graphql')
    .set('Authorization', `Bearer Placeholder`)
    .send({
      query: `{
        vehicle
        { id, driver, licensePlate, make, model, color }
      }`
    })
    .then((res) => {
      expect(res.body.data.vehicle.length).toEqual(4)
    })
})

test('Returns Member\'s Vehicles', async () => {
  await supertest(server)
    .post('/graphql')
    .set('Authorization', `Bearer Placeholder`)
    .send({
      query: `{
        userVehicle
        { id, driver, licensePlate, make, model, color }
      }`
    })
    .then((res) => {
      expect(res.body.data.userVehicle.length).toEqual(2)
    })
})

test('Returns vehicle by vehicle ID and authenticated user ID', async () => {
  const vehiclesResponse = await supertest(server)
    .post('/graphql')
    .set('Authorization', `Bearer Placeholder`)
    .send({
      query: `{
        userVehicle
        { id, driver, licensePlate, make, model, color }
      }`
    })
  
  await supertest(server)
    .post('/graphql')
    .set('Authorization', `Bearer Placeholder`)
    .send({
      query: `
        query GetVehicle($id: String!) {
          getVehicleById(id: $id) {
            id
            driver
            licensePlate
            make
            model
            color
            active
          }
        }
      `,
      variables: {
        id: vehiclesResponse.body.data.userVehicle[0].id
      }
    })
    .then((res) => {
      console.log('response errors:', res.body.errors)
      console.log('get Vehicle info:', res.body.data)
      expect(res.body.data.getVehicleById).toBeDefined()
    })
})

/*reference: https://jestjs.io/docs/mock-function-api#mockfnmockrejectedvaluevalue */
test('Returns unauthorized error when auth service throws', async () => {
  authserviceMock.mockRejectedValue(new Error('Authentication failed'))
  
  await supertest(server)
    .post('/graphql')
    .set('Authorization', `Bearer InvalidToken`)
    .send({
      query: `{
        vehicle {
          id
          driver
          licensePlate
        }
      }`
    })
    .then((res) => {
      expect(res.body.errors).toBeDefined()
    })
})


test('Member Registers a Vehicle', async () => {
  await supertest(server)
    .post('/graphql')
    .set('Authorization', `Bearer Placeholder`)
    .send({
      query: `
        mutation {
          registerVehicle(input: {
            licensePlate: "TEST123",
            make: "Toyota",
            model: "Corolla",
            color: "Silver"
          }) {
            id
            licensePlate
            make
            model
            color
            driver
            active
          }
        }
      `
    })
    .then((res) => {
      expect(res.body.data.registerVehicle.licensePlate).toBe("TEST123")
    })
})

test('user who do no thave primary car', async () => {
  await supertest(server)
    .post('/graphql')
    .set('Authorization', `Bearer Placeholder`)
    .send({
      query: `{
        primaryVehicle
        { id, driver, licensePlate, make, model, color }
      }`
    })
    .then((res) => {
      console.log('primary vehicle info:',res.body.data.primaryVehicle)
      expect(res.body.data.primaryVehicle).toBe(null)
    })
})

test('user who has primary car', async () => {
  await supertest(server)
    .post('/graphql')
    .set('Authorization', `Bearer Placeholder`)
    .send({
      query: `
        mutation {
          registerVehicle(input: {
            licensePlate: "TEST123",
            make: "Toyota",
            model: "Corolla",
            color: "Silver"
          }) {
            id
            licensePlate
            make
            model
            color
            driver
            active
          }
        }
      `
    })
  await supertest(server)
    .post('/graphql')
    .set('Authorization', `Bearer Placeholder`)
    .send({
      query: `{
        primaryVehicle {
          id
          driver
          licensePlate
          make
          model
          color
          active
        }
      }`
    })
    .then((res) => {
      console.log('primary vehicle info:',res.body.data.primaryVehicle)
      expect(res.body.data.primaryVehicle.licensePlate).toBe("TEST123")
    })
})




