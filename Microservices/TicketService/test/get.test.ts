import { vi, test, beforeAll, afterAll, expect } from "vitest";
import * as http from "http";
import supertest from "supertest";
import * as db from './db'
import { app, bootstrap } from "../src/app";

let server: http.Server<
  typeof http.IncomingMessage,
  typeof http.ServerResponse
>;

beforeAll(async () => {
  server = http.createServer(app);
  server.listen();
  await db.reset()
  await bootstrap();
});

afterAll(() => {
  db.shutdown()
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


test("Gets all tickets through admin", async () => {
  await supertest(server)
    .post("/graphql")
    .set('Authorization', 'Bearer ' + accessToken)
    .send({
      query: `
        query {
          ticket {
            violation
          }
        }
      `,
    })
    .then((res) => {
      expect(res.body.data.ticket[0].violation).toEqual("expired meter");

    });
});
test("Gets all tickets through admin", async () => {
  await supertest(server)
    .post("/graphql")
    .set('Authorization', 'Bearer ' + accessToken)
    .send({
      query: `
        query {
          allTicket {
            violation
          }
        }
      `,
    })
    .then((res) => {
      expect(res.body.data.allTicket.length).toEqual(3);

    });
});

test("Get all paid tickets", async () => {
  await supertest(server)
    .post("/graphql")
    .set('Authorization', 'Bearer ' + accessToken)
    .send({
      query: `
        query {
          paidTicket {
            violation
          }
        }
      `,
    })
    .then((res) => {
      // console.log(res.body.data)
      expect(res.body.data.paidTicket.length).toEqual(0);

    });
});

test("Get all unpaid tickets", async () => {
  await supertest(server)
    .post("/graphql")
    .set('Authorization', 'Bearer ' + accessToken)
    .send({
      query: `
        query {
          unpaidTicket {
            violation
          }
        }
      `,
    })
    .then((res) => {
      expect(res.body.data.unpaidTicket.length).toEqual(1);

    });
});

test("Get ticket with id", async () => {
  await supertest(server)
    .post("/graphql")
    .set('Authorization', 'Bearer ' + accessToken)
    .send({
      query: `
        query {
          ticketId(id: "cc97d397-6906-44ee-b616-6ee746914474") {
            violation
          }
        }
      `,
    })
    .then((res) => {
      expect(res.body.data.ticketId.violation).toBe('expired meter')

    });
});

test("Update ticket paid status", async () => {
  await supertest(server)
    .post("/graphql")
    .set('Authorization', 'Bearer ' + accessToken)
    .send({
      query: `
        mutation {
          setTicketPaid(id: "cc97d397-6906-44ee-b616-6ee746914474", paid: true) {
            paid
          }
        }
      `,
    })
    .then((res) => {
      expect(res.body.data.setTicketPaid.paid).toBeTruthy()
    });
});

test("Get all active appeals", async () => {
  await supertest(server)
    .post("/graphql")
    .set('Authorization', 'Bearer ' + accessToken)
    .send({
      query: `
        query {
          activeAppeals {
            violation,
            description
          }
        }
      `,
    })
    .then((res) => {
      expect(res.body.data.activeAppeals[0].description).toEqual("a ticket you might want to appeal");

    });
});