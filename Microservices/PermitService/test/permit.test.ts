import { test, beforeAll, afterAll, beforeEach, expect } from 'vitest'
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

const accessToken = "placeholder"

test('Get all permits', async () => {
  await supertest(server)
    .post('/graphql')
    .set('Authorization', 'Bearer ' + accessToken)
    .send({
      query: `{
        permit
        { license_number, issue_date, exp_date }
      }`
    })
    .then((res) => {
      expect(res.body.data.permit.length).toEqual(1)
    })
})