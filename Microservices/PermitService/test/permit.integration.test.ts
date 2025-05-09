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

test('Unauthorized PermitService call is rejected', async () => {
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
