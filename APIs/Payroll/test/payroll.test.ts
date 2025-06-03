import { test, beforeAll, afterAll} from 'vitest'
import supertest from 'supertest'
import * as http from 'http'
import dotenv from 'dotenv'
dotenv.config()

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
const apiKey = 'harrisdavid';

test('User can query if they have tickets they have to pay', async () => {
  const email ='matt@books.com';
  await supertest(server)
    .get('/api/v0/payroll?email=' + email)
    .set('Authorization', 'Bearer ' + apiKey)
    .send(email)
    .expect(200)
})


test('User can query if they have tickets they have to pay', async () => {
  const email ='dog@books.com';
  await supertest(server)
    .get('/api/v0/payroll?email=' + email)
    .set('Authorization', 'Bearer ' + apiKey)
    .send(email)
    .expect(200)
})