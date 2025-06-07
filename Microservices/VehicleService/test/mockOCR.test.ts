import { vi, test, beforeAll, afterAll, beforeEach, expect } from 'vitest'
import supertest from 'supertest'
import * as http from 'http'
import * as db from './db'
import { app, bootstrap } from '../src/app'
// https://chatgpt.com/c/68224fea-167c-8007-b525-2167c07b5496
// mock auth service
const authserviceMock = vi.fn()
vi.mock('../src/auth/service', () => {
  return {
    AuthService: class {
      check = authserviceMock
    }
  }
})

// mock google vision
vi.mock('@google-cloud/vision', () => {
  return {
    default: {
      ImageAnnotatorClient: class {
        async textDetection() {
          return [
            {
              textAnnotations: [
                { description: 'ABC 123' } // Matches your regex
              ]
            }
          ]
        }
      }
    }
  }
})

let server: http.Server

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
  authserviceMock.mockResolvedValue({ id: '45c90975-92e0-4a51-b5ea-2fe5f8613b54' })
  return db.reset()
})

test('Scans base64 image and returns license plate text', async () => {
  const fakeImage = Buffer.from('fake image data').toString('base64')

  const res = await supertest(server)
    .post('/graphql')
    .set('Authorization', `Bearer Placeholder`)
    .send({
      query: `
        mutation {
          scanImage(base64Image: "${fakeImage}") {
            licensePlate
          }
        }
      `
    })

  expect(res.body.data.scanImage.licensePlate).toBe('ABC123')
})
