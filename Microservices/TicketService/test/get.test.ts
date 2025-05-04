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

export const anna = {
  email: 'anna@books.com',
  password: 'annaadmin',
  name: "Anna Admin",
}

vi.mock('../src/auth/service', () => {
  return {
    AuthService: class {
      async check() {
        return { id: '45c90975-92e0-4a51-b5ea-2fe5f8613b54' }
      }
    }
  }
})

const accessToken = 'Placeholder before authenticated implementation'


test("Gets all tickets", async () => {
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
      console.log(res.body.data)
      expect(res.body.data.paidTicket.length).toEqual(1);

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
      console.log(res.body.data)
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
      console.log(res.body.data)
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
          updateTicketPaid(id: "cc97d397-6906-44ee-b616-6ee746914474") {
            paid
          }
        }
      `,
    })
    .then((res) => {
      console.log(res.body.data)
      expect(res.body.data.updateTicketPaid.paid).toBeTruthy()

    });
});