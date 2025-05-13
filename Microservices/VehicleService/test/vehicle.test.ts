import { vi, test, beforeAll, afterAll, beforeEach, expect } from 'vitest'
import supertest from 'supertest'
import * as http from 'http'

import * as db from './db'
import { app, bootstrap } from '../src/app'

let server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>

vi.mock('../src/auth/service', () => {
  return {
    AuthService: class {
      async check() {
        return { id: '45c90975-92e0-4a51-b5ea-2fe5f8613b54' }
      }
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



// test('user gets primary vehicle', async () => {
//   const accessToken = await getAccessToken(molly.email, molly.password);
//   const result = await supertest(server)
//     .post('/graphql')
//     .set('Authorization', `Bearer ${accessToken}`)
//     .send({
//       query: `{
//         primaryVehicle {
//           id
//           driver
//           licensePlate
//           make
//           model
//           color
//           active
//         }
//       }`
//     });
//   expect(result.body.data.primaryVehicle.licensePlate).toBe('TEST123');
// });

// function then(arg0: (res: any) => void) {
//   throw new Error('Function not implemented.')
// }

