import { test, beforeAll, expect, afterAll, afterEach } from 'vitest'
import supertest from 'supertest'
import * as http from 'http'

import * as db from './db'
import { app, bootstrap } from '../src/app'

let server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>

const anna = {
  email: 'anna@books.com',
  password: 'annaadmin'
}

const molly = {
  email: 'molly@books.com',
  password: 'mollymember'
}

async function getAccessToken(email: string, pwd: string): Promise<string> {
  const response = await supertest('http://localhost:3010')
    .post('/api/v0/auth/login')
    .send({ email: email, password: pwd })

  if (response.status !== 200) {
    throw new Error('Login failed')
  }

  return response.body.accessToken
}

beforeAll(async () => {
  server = http.createServer(app)
  await db.reset()
  await bootstrap()
})


afterAll(() => {
  db.shutdown()
  server.close
})

afterEach(async () => {
  await db.reset()
})

test('Unauthorized requests to VehicleService are rejected', async () => {
  await supertest(server)
    .post('/graphql')
    .send({
      query: `{
        vehicle
        { id, driver, licensePlate, make, model, color }
      }`
    })
    .then((res) => {
      expect(res.body.errors).toBeDefined()
    })
})

test('Returns all vehicles', async () => {
  const accessToken = await getAccessToken(anna.email, anna.password)

  await supertest(server)
    .post('/graphql')
    .set('Authorization', `Bearer ` + accessToken)
    .send({
      query: `{
        vehicle
        { id, driver, licensePlate, make, model, color }
      }`
    })
    .then((res) => {
      expect(res.body.data.vehicle.length).toEqual(3)
    })
})

test('Member Registers a Vehicle', async () => {
  const accessToken = await getAccessToken(molly.email, molly.password)

  await supertest(server)
    .post('/graphql')
    .set('Authorization', `Bearer ` + accessToken)
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
          }
        }
      `
    })
    .then((res) => {
      expect(res.body.data.registerVehicle.licensePlate).toBe("TEST123")
    })
})