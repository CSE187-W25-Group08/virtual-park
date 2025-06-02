import { test, beforeAll, afterAll} from 'vitest'
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

test('User can query if they have tickets they have to pay', async () => {
  const email ='tommy@books.com';
  await supertest(server)
    .get('/api/v0/payroll?email=' + email)
    .send(email)
    .expect(200)
})

