import { vi, test, beforeAll, afterAll, expect, afterEach } from "vitest";
import * as http from "http";
import supertest from "supertest";
// import * as db from './db'
import { app, bootstrap } from "../src/app";
import { AuthService } from "../src/auth/service";

let server: http.Server<
  typeof http.IncomingMessage,
  typeof http.ServerResponse
>;

beforeAll(async () => {
  server = http.createServer(app);
  server.listen();
  //await db.reset()
  await bootstrap();
});

afterEach(() => {
  vi.clearAllMocks()
})

afterAll(() => {
  //db.shutdown()
  server.close();
});


const accessToken = 'Placeholder before authenticated implementation'


test("Auth check throws error if unauthroized", async () => {
  vi.mock('../src/auth/service', () => {
    return {
      AuthService: class {
        async check() {
          throw new Error('Unauthorized');
        }
      }
    }
  });

  await supertest(server)
    .post("/graphql")
    .set('Authorization', 'Bearer ' + accessToken)
    .send({
      query: `
      mutation {
          createPaymentIntent(amount: 5555) {
          clientSecret
        }
      }
      `,
    })
    .then((res) => {
      expect(res.body.errors).toBeDefined();
    });
});

test('should resolve with user data when fetch returns 200', async () => {
  // for some reason the mocked module is hoisted to top even if i put this in aftereach
  vi.unmock('../src/auth/service');   
  vi.resetModules();  
  global.fetch = vi.fn().mockResolvedValueOnce({
    status: 200,
    json: () =>
      Promise.resolve({
        id: 'user123',
        name: 'John Doe',
        role: 'admin',
      }),
  });

  const authHeader = 'Bearer mockToken';
  const authService = new AuthService();
  await authService.check(authHeader);

  expect(global.fetch).toHaveBeenCalledWith('http://localhost:3010/api/v0/auth/check', {
    method: 'GET',
    headers: {
      Authorization: 'Bearer mockToken',
    },
  });
});

test('unauthorized 400 for check service', async () => {
  // for some reason the mocked module is hoisted to top even if i put this in aftereach
  vi.unmock('../src/auth/service');   
  vi.resetModules();  
  global.fetch = vi.fn().mockResolvedValueOnce({
    status: 400,
    json: () =>
      Promise.resolve({
        id: 'user123',
        name: 'John Doe',
        role: 'admin',
      }),
  });

  const authHeader = 'Bearer mockToken';
  const authService = new AuthService();

  await expect(authService.check(authHeader)).rejects.toEqual('Unauthorized');
});