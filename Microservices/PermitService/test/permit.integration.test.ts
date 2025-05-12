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

const nick = {
  email: 'nick@books.com',
  password: 'nickenforcement'
}


async function getAccessToken(email: string, pwd: string): Promise<string> {
  const response = await supertest('http://localhost:3010')
    .post('/api/v0/auth/login')
    .send({ email: email, password: pwd });

  if (response.status !== 200) {
    throw new Error('Login failed');
  }

  return response.body.accessToken;
}

beforeAll(async () => {
  server = http.createServer(app)
  await db.reset()
  await bootstrap()
})


afterAll(() => {
  db.shutdown()
  server.close()
})

afterEach(async () => {
  await db.reset()
})

test('Get all permitType from in-process PermitService', async () => {
  const accessToken = await getAccessToken(anna.email, anna.password)
  
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
      if (res.body.errors) {
        console.error('GraphQL errors:', res.body.errors)
      }
      expect(res.body.data.PermitType.length).toEqual(3)
    })
})

test('Unauthorized PermitType call is rejected', async () => {
  await supertest(server)
    .post('/graphql')
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
})

test('Get all permitByDriver from in-process PermitService', async () => {
  const accessToken = await getAccessToken(anna.email, anna.password)
  
  await supertest(server)
    .post('/graphql')
    .set('Authorization', 'Bearer ' + accessToken)
    .send({
      query: `{
        permitsByDriver {
          id
          issueDate
          expDate
          type
          price
        }
      }`
    })
    .then((res) => {
      if (res.body.errors) {
        console.error('GraphQL errors:', res.body.errors)
      }
      console.log('permit by user integration test:', res.body.data.permitsByDriver)
      expect(res.body.data.permitsByDriver.length).toEqual(0)
    })
})

test('Unauthorized PermitByDriver call is rejected', async () => {
  await supertest(server)
    .post('/graphql')
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
      expect(res.body.errors).toBeDefined()
    })
})

test('Get all getPermitBycarPlate from in-process PermitService', async () => {
  const accessToken = await getAccessToken(nick.email, nick.password)
  
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
      console.log('get permit by carPlate integration test:', res.body.data.getPermitBycarPlate)
      expect(res.body.data.getPermitBycarPlate.length).toEqual(2)
    })
})



test('Unauthorized getPermitBycarPlate call is rejected', async () => {
  await supertest(server)
    .post('/graphql')
    .send({
      query: `{
        getPermitBycarPlate {
          permitID
          permitType
          issueDate
          expDate
          isValid
        }
      }`
    })
    .then((res) => {
      expect(res.body.errors).toBeDefined()
    })
})
