import dotenv from 'dotenv'
dotenv.config()
import { expect, test, beforeAll, afterAll} from 'vitest'
import supertest from 'supertest'
import * as http from 'http'
import { fetchMocks } from './fetchMocks'
import { setupServer } from 'msw/node'

import app from '../src/app'

let server: http.Server<
  typeof http.IncomingMessage,
  typeof http.ServerResponse
>

const mswServer = setupServer(...fetchMocks)

beforeAll(async () => {
  server = http.createServer(app)
  server.listen()
  mswServer.listen({
    onUnhandledRequest: 'bypass'
  })
})

afterAll(() => {
  server.close()
})
const apiKey = "nVSui82nregistar8FHnFh38";

test('User has 0 unpaid tickets', async () => {
  const email ='matt@books.com';
  await supertest(server)
    .get('/api/v0/registrar?email=' + email)
    .set('Authorization', 'Bearer ' + apiKey)
    .send(email)
    .then((res) => {
      expect(res.body).toEqual(false)
    })
})

test('User has at least 1 unpaid ticket', async () => {
  const email ='dog@books.com';
  await supertest(server)
    .get('/api/v0/registrar?email=' + email)
    .set('Authorization', 'Bearer ' + apiKey)
    .send(email)
    .then((res) => {
      expect(res.body).toEqual(true)
    })
})

test('Return false if the user does not exist', async () => {
  const email ='fake@books.com';
  await supertest(server)
    .get('/api/v0/registrar?email=' + email)
    .set('Authorization', 'Bearer ' + apiKey)
    .send(email)
    .then((res) => {
      expect(res.body).toEqual(false)
    })
})

test('Problem with fetch', async () => {
  const email ='problem@books.com';
  await supertest(server)
    .get('/api/v0/registrar?email=' + email)
    .set('Authorization', 'Bearer ' + apiKey)
    .send(email)
    .then((res) => {
      expect(res.body).toEqual(false)
    })
})

test('Empty response body', async () => {
  const email ='empty@books.com';
  await supertest(server)
    .get('/api/v0/registrar?email=' + email)
    .set('Authorization', 'Bearer ' + apiKey)
    .send(email)
    .then((res) => {
      expect(res.body).toEqual(false)
    })
})

test('Bad header', async () => {
  const email ='dog@books.com';
  await supertest(server)
    .get('/api/v0/registrar?email=' + email)
    .set('Authorization', 'BearerBad')
    .send(email)
    .expect(401)
})

test('bad auth key', async () => {
  const email ='dog@books.com';
  await supertest(server)
    .get('/api/v0/registrar?email=' + email)
    .set('Authorization', 'Bearer ' + 'bad')
    .send(email)
    .expect(401)
})

test('no auth key', async () => {
  const email ='dog@books.com';
  await supertest(server)
    .get('/api/v0/registrar?email=' + email)
    .send(email)
    .expect(401)
})

test('Returns 400 when email query param is missing', async () => {
  await supertest(server)
    .get('/api/v0/registrar')
    .set('Authorization', 'Bearer ' + apiKey)
    .expect(400)
})

test('Returns 404 when request is invalid', async () => {
  await supertest(server)
    .get('/api/v0/registrar/huh')
    .set('Authorization', 'Bearer ' + apiKey)
    .expect(404)
})
