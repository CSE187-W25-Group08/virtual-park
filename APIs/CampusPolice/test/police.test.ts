import dotenv from 'dotenv'
dotenv.config()
import { test, beforeAll, afterAll, expect } from 'vitest'
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
  mswServer.close()
})

test('Rejects requests without an API key', async () => {
  await supertest(server)
    .get('/api/v0/police/test')
    .expect(401)
})

test('Rejects request with bad header', async () => {
  await supertest(server)
    .get('/api/v0/police/test')
    .set('Authorization', 'BearerNotTheAPIKey')
    .expect(401)
})

test('Rejects requests with the wrong API key', async () => {
  await supertest(server)
    .get('/api/v0/police/test')
    .set('Authorization', 'Bearer NotTheAPIKey')
    .expect(401)
})

test('404 response for a non-existent route', async () => {
  await supertest(server)
    .get('/api/v0/police/fakeRoute')
    .set('Authorization', 'Bearer ' + "cn798J2policeCmn27HarrisnvwAS")
    .expect(404)
})

test('"this works" command returns correctly', async () => {
  await supertest(server)
    .get('/api/v0/police/test')
    .set('Authorization', 'Bearer ' + "cn798J2policeCmn27HarrisnvwAS")
    .then((res) => {
      expect(res.body).toEqual('this works')
    })
})

test('Returns false for a plate without permit', async () => {
  await supertest(server)
    .get('/api/v0/police/permit?plate=ZZZ123Z')
    .set('Authorization', 'Bearer ' + "cn798J2policeCmn27HarrisnvwAS")
    .then((res) => {
      expect(res.body).toEqual(false)
    })
})

test('Returns true for a plate with a permit', async () => {
  await supertest(server)
    .get('/api/v0/police/permit?plate=123BC4A')
    .set('Authorization', 'Bearer ' + "cn798J2policeCmn27HarrisnvwAS")
    .then((res) => {
      expect(res.body).toEqual(true)
    })
})

test('Returns false for a plate with expired permit', async () => {
  await supertest(server)
    .get('/api/v0/police/permit?plate=7ZJN054')
    .set('Authorization', 'Bearer ' + "cn798J2policeCmn27HarrisnvwAS")
    .then((res) => {
      expect(res.body).toEqual(false)
    })
})

test('Rejects permit check when no plate is given', async () => {
  await supertest(server)
    .get('/api/v0/police/permit')
    .set('Authorization', 'Bearer ' + "cn798J2policeCmn27HarrisnvwAS")
    .expect(400)
})
