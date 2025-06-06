import dotenv from 'dotenv'
dotenv.config()
import { test, beforeAll, afterAll, expect } from 'vitest'
import supertest from 'supertest'
import * as http from 'http'

import app from '../src/app'

let server: http.Server<
  typeof http.IncomingMessage,
  typeof http.ServerResponse
>

beforeAll(async () => {
  server = http.createServer(app)
  server.listen()
})

afterAll(() => {
  server.close()
})

test('"this works" command returns correctly', async () => {
  await supertest(server)
    .get('/api/v0/police/test')
    .set('Authorization', 'Bearer ' + process.env.POLICE_API_KEY)
    .then((res) => {
      expect(res.body).toEqual('this works')
    })
})
