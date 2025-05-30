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



test("A payment confirmation is sent", async () => {
  await supertest(server)
    .post("/graphql")
    .set('Authorization', 'Bearer ' + accessToken)
    .send({
      query: `
        mutation {
          sendPermitPaymentEmail(
            email: "jiqle@ucsc.edu",
            name: "John Doe",
            nameOfProduct: "Monthly Permit",
            costOfProduct: 1999,
            metadata: {
              permitTypeId: "permit-123",
              vehicleId: "vehicle-456"
            }
          )
        }
      `,
    })
    .then((res) => {
      console.log(res.body.errors)
      expect(res.body.data.sendPermitPaymentEmail).toBeTruthy()
    });
});

