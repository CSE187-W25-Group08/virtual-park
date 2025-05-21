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

test("User can retrieve stripe config", async () => {
  await supertest(server)
    .post("/graphql")
    .set('Authorization', 'Bearer ' + accessToken)
    .send({
      query: `
      query {
          config {
          publicKey
          unitAmount
          currency
        }
      }
      `,
    })
    .then((res) => {
      expect(res.body.data.config.publicKey).toBeTruthy()
    });
});

test("User can create stripe checkout session", async () => {
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
      console.log(res.body)
      expect(res.body.data.createPaymentIntent.clientSecret).toBeTruthy()
    });
});
