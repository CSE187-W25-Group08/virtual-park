// import Stripe from 'stripe'
import 'dotenv/config';
import { vi, test, beforeAll, afterAll, expect } from "vitest";
import * as http from "http";
import supertest from "supertest";
import { app, bootstrap } from "../src/app";

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

afterAll(() => {
  //db.shutdown()
  server.close();
});


vi.mock('../src/auth/service', () => {
  return {
    AuthService: class {
      async check() {
        return { id: '03845709-4d40-45fe-9e51-11789f6f209a' }
      }
    }
  }
})

const accessToken = 'Placeholder before authenticated implementation'
// Mock Stripe's checkout session creation
vi.mock('stripe', () => {
  return {
    default: vi.fn().mockImplementation(() => ({
      checkout: {
        sessions: {
          create: vi.fn().mockResolvedValue({ /* url missing on purpose */ })
        }
      }
    }))
  }
})

test("Throws error when Stripe session URL is missing", async () => {
  await supertest(server)
    .post("/graphql")
    .set('Authorization', 'Bearer ' + accessToken)
    .send({
      query: `
        mutation {
          createCheckoutSession(
            amount: 5555,
            name: "Test",
            metadata: {id : "test", cat: "big"},
            successUrl: "https://example.com/success",
            cancelUrl: "https://example.com/cancel"
          )
        }
      `,
    })
    .then((res) => {
      expect(res.body.errors).toBeDefined()
      expect(res.body.errors[0].message).toContain("Failed to create checkout session")
    })
})
