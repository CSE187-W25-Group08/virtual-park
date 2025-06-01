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



test("A payment confirmation is sent involving permit", async () => {
  await supertest(server)
    .post("/graphql")
    .set('Authorization', 'Bearer ' + accessToken)
    .send({
      query: `
        mutation {
          sendPermitPaymentEmail(
            email: "dog@ucsc.edu",
            name: "John Doe",
            nameOfProduct: "Monthly Permit",
            costOfProduct: 1999,
            permitTypeId: "permit-123",
            vehicleId: "vehicle-456"
          )
        }
      `,
    })
    .then((res) => {
      console.log(res.body.errors)
      expect(res.body.data.sendPermitPaymentEmail).toBeTruthy()
    });
});


test("A payment confirmation is sent involving ticket", async () => {
  await supertest(server)
    .post("/graphql")
    .set('Authorization', 'Bearer ' + accessToken)
    .send({
      query: `
        mutation {
          sendTicketPaymentEmail(
            email: "HopefullySomeRandomEmail@gmail.com",
            name: "John Doe",
            nameOfProduct: "Monthly ticket",
            costOfProduct: 1999,
            ticketId: "ticket-123",
          )
        }
      `,
    })
    .then((res) => {
      console.log(res.body.errors)
      expect(res.body.data.sendTicketPaymentEmail).toBeTruthy()
    });
});

test("A rejected appeal is sent involving ticket", async () => {
  await supertest(server)
    .post("/graphql")
    .set('Authorization', 'Bearer ' + accessToken)
    .send({
      query: `
        mutation {
          sendTicketAppealRejectedEmail(
            email: "ItsAMeMario@ucsc.edu",
            name: "John Doe",
            ticketId: "ticket-123",
            violation: "Parked illegally",
          )
        }
      `,
    })
    .then((res) => {
      console.log(res.body.errors)
      expect(res.body.data.sendTicketAppealRejectedEmail).toBeTruthy()
    });
});

test("A accepted appeal is sent involving ticket", async () => {
  await supertest(server)
    .post("/graphql")
    .set('Authorization', 'Bearer ' + accessToken)
    .send({
      query: `
        mutation {
          sendTicketAppealAcceptedEmail(
            email: "jiqle@ucsc.edu",
            name: "John Doe",
            ticketId: "ticket-123",
            violation: "Parked illegally",
          )
        }
      `,
    })
    .then((res) => {
      console.log(res.body.errors)
      expect(res.body.data.sendTicketAppealAcceptedEmail).toBeTruthy()
    });
});