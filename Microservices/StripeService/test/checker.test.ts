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
        throw new Error("Unauthorized") // Forces expressAuthChecker to return false
      }
    }
  }
})


const accessToken = 'Placeholder before authenticated implementation'



test("Check fails", async () => {
  await supertest(server)
    .post("/graphql")
    .set('Authorization', 'Bearer ' + accessToken)
    .send({
      query: `
      mutation {
          createCheckoutSession(amount: 5555, name: "Test", metadata: {id : "test", cat: "big"}, successUrl: "https://example.com/success", cancelUrl: "https://example.com/cancel")
      }
      `,
    })
    .then((res) => {
      expect(res.body.errors).toBeDefined()
    })
});