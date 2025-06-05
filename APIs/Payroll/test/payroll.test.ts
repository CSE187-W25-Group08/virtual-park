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
const apiKey = process.env.PAYROLL_API_KEY;

test('User can query if they have tickets they have to pay', async () => {
  const email ='matt@books.com';
  await supertest(server)
    .get('/api/v0/payroll?email=' + email)
    .set('Authorization', 'Bearer ' + apiKey)
    .send(email)
    .expect(200)
})

test('Unknown User can query if they have tickets they have to pay', async () => {
  const email ='dog@books.com';
  await supertest(server)
    .get('/api/v0/payroll?email=' + email)
    .set('Authorization', 'Bearer ' + apiKey)
    .send(email)
    .expect(200)
})

test('bad auth key', async () => {
  const email ='dog@books.com';
  await supertest(server)
    .get('/api/v0/payroll?email=' + email)
    .set('Authorization', 'Bearer ' + 'bad')
    .send(email)
    .expect(401)
})

test('no auth key', async () => {
  const email ='dog@books.com';
  await supertest(server)
    .get('/api/v0/payroll?email=' + email)
    .send(email)
    .expect(401)
})

test('Returns 400 when email query param is missing', async () => {
  await supertest(server)
    .get('/api/v0/payroll') // no ?email=
    .set('Authorization', 'Bearer ' + apiKey)
    .expect(400)
})

test('Returns 404 when request is invalid', async () => {
  await supertest(server)
    .get('/api/v0/payroll/huh')
    .set('Authorization', 'Bearer ' + apiKey)
    .expect(404)
})

test('GET /api/v0/docs/ returns Swagger UI HTML', async () => {
  await supertest(server)
    .get('/api/v0/docs/') // trailing slash avoids redirect
    .expect('Content-Type', /html/)
    .expect(200)
})

