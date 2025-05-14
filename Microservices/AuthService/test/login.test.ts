import { expect, test, beforeAll, afterAll, beforeEach, vi } from 'vitest'
import * as http from 'http'

import * as db from './db'
import app from '../src/app'
import { AuthService } from '../src/auth/authService'

let server: http.Server<
  typeof http.IncomingMessage,
  typeof http.ServerResponse
>

beforeAll(async () => {
  server = http.createServer(app)
  server.listen()
  return db.reset()
})

afterAll(() => {
  db.shutdown()
  server.close()
})

beforeEach(async () => {
  await db.reset();
})

vi.mock('../src/auth/db', () => {
    return {
      async verifyLogin() {
        throw new Error('Unauthorized');
      }
    }
  });

test('should catch an error and return undefined', async () => {
  const mockCredentials = { email: 'invalid', username: 'test', password: 'wrong' };


  const authService = new AuthService();
  const result = await authService.login(mockCredentials);

  expect(result).toBeUndefined();
});