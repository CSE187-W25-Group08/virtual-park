import { vi, test, beforeAll, afterAll, expect } from "vitest";
import * as http from "http";
import supertest from "supertest";
import * as db from "./db";
import { app, bootstrap } from "../src/app";
import { Ticket } from "../src/ticket/schema";

let server: http.Server<
  typeof http.IncomingMessage,
  typeof http.ServerResponse
>;

beforeAll(async () => {
  server = http.createServer(app);
  server.listen();
  await db.reset();
  await bootstrap();
});

afterAll(() => {
  db.shutdown();
  server.close();
});

vi.mock("../src/auth/service", () => {
  return {
    AuthService: class {
      async check() {
        return { id: "03845709-4d40-45fe-9e51-11789f6f209a" };
      }
    },
  };
});

const accessToken = "Placeholder before authenticated implementation";

test("Gets all tickets through admin", async () => {
  await supertest(server)
    .post("/graphql")
    .set("Authorization", "Bearer " + accessToken)
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
    .set("Authorization", "Bearer " + accessToken)
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
      expect(res.body.data.allTicket.length).toEqual(4);
    });
});

test("Get all paid tickets", async () => {
  await supertest(server)
    .post("/graphql")
    .set("Authorization", "Bearer " + accessToken)
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
      expect(res.body.data.paidTicket.length).toEqual(0);
    });
});

test("Get all unpaid tickets", async () => {
  await supertest(server)
    .post("/graphql")
    .set("Authorization", "Bearer " + accessToken)
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
      expect(res.body.data.unpaidTicket.length).toEqual(2);
    });
});

test("Get ticket with id", async () => {
  await supertest(server)
    .post("/graphql")
    .set("Authorization", "Bearer " + accessToken)
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
      expect(res.body.data.ticketId.violation).toBe("expired meter");
    });
});

test("Update ticket paid status", async () => {
  await supertest(server)
    .post("/graphql")
    .set("Authorization", "Bearer " + accessToken)
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
      expect(res.body.data.setTicketPaid.paid).toBeTruthy();
    });
});

test("Get all active appeals", async () => {
  await supertest(server)
    .post("/graphql")
    .set("Authorization", "Bearer " + accessToken)
    .send({
      query: `
        query {
          appealedTicket {
            violation,
            description
          }
        }
      `,
    })
    .then((res) => {
      expect(res.body.data.appealedTicket[0].description).toEqual(
        "a ticket you might want to appeal"
      );
    });
});

test("Update a ticket to be appealed", async () => {
  let initialAppealCount: number;
  let unappealedTicketId = null;
  await supertest(server)
    .post("/graphql")
    .set("Authorization", "Bearer " + accessToken)
    .send({
      query: `
        query {
          allTicket {
            id,
            appeal,
            appealReason
          }
        }
      `,
    })
    .then((res) => {
      unappealedTicketId = res.body.data.allTicket.filter(
        (ticket: Ticket) => ticket.appeal == "null"
      )[0].id;
      initialAppealCount = res.body.data.allTicket.filter(
        (ticket: Ticket) =>
          ticket.appeal != "null" && ticket.appeal != "rejected"
      ).length;
    });

  await supertest(server)
    .post("/graphql")
    .set("Authorization", "Bearer " + accessToken)
    .send({
      query: `
        mutation {
          setTicketAppealed(id: "${unappealedTicketId}", appealStatus: "submitted", appealReason: "I DISAGREE") {
            id,
            appeal,
            appealReason
          }
        }
      `,
    });

  await supertest(server)
    .post("/graphql")
    .set("Authorization", "Bearer " + accessToken)
    .send({
      query: `
        query {
          appealedTicket {
            id,
            appeal,
            appealReason
          }
        }
      `,
    })
    .then((res) => {
      expect(res.body.data.appealedTicket.length).toEqual(
        initialAppealCount + 1
      );
    });
});

test("Get all unpaid tickets", async () => {
  await supertest(server)
    .post("/graphql")
    .set("Authorization", "Bearer " + accessToken)
    .send({
      query: `
        query {
          allUnpaidTickets {
            violation,
            description
          }
        }
      `,
    })
    .then((res) => {
      expect(res.body.data.allUnpaidTickets.length).toEqual(3);
    });
});

test("Get spefic ticket with admin endpoint", async () => {
  let ticketId;
  await supertest(server)
    .post("/graphql")
    .set("Authorization", "Bearer " + accessToken)
    .send({
      query: `
        query {
          allTicket {
            id,
            appeal
          }
        }
      `,
    })
    .then((res) => {
      ticketId = res.body.data.allTicket[0].id;
    });
  await supertest(server)
    .post("/graphql")
    .set("Authorization", "Bearer " + accessToken)
    .send({
      query: `
        query {
          getTicketInfo (ticketId: "${ticketId}") {
            id,
            vehicle,
            lot,
            appeal
          }
        }
      `,
    })
    .then((res) => {
      console.log(res.body.errors);
      expect(res.body.data.getTicketInfo.id).toEqual(ticketId);
    });
});

test("Issue a new ticket", async () => {
  const testTicketData = {
    driverID: "5f3a9c2d-8b45-4e87-a130-9cf85df72b1a",
    vehicleID: "7de23f18-c56b-42d1-b8a9-3e4f8c2d1a5b",
    enforcer: "7de23f18-c56b-42d1-b8a9-3e4f8c2d1a12",
    lot: "c72e1459-5b52-41f2-b731-15c7c981e8b0",
    paid: false,
    description: "no valid permit exist",
    violation: "No permit",
    image:
      "https://krcrtv.com/resources/media2/16x9/full/1015/center/80/6918a95f-2801-4fa8-b65f-51c46a5395a5-large16x9_crash.jpg",
    cost: 50,
  };

  await supertest(server)
    .post("/graphql")
    .set("Authorization", "Bearer " + accessToken)
    .send({
      query: `
        mutation IssueTicket(
          $driverID: String!,
          $vehicleID: String!,
          $lot: String!,
          $paid: Boolean!,
          $description: String!,
          $violation: String!,
          $image: String!,
          $cost: Float!
        ) {
          ticketIssue(
            driverID: $driverID,
            vehicleID: $vehicleID,
            lot: $lot,
            paid: $paid,
            description: $description,
            violation: $violation,
            image: $image,
            cost: $cost
          ) {
            id
            vehicle
            enforcer
            lot
            paid
            description
            violation
            image
            cost
            appeal
          }
        }
      `,
      variables: testTicketData,
    })
    .then((res) => {
      console.log("the details of the ticketissue:", res.body.data.ticketIssue);
      expect(res.body.data.ticketIssue).toBeDefined();
    });
});

test("Approve an appeal", async () => {
  const appealedTicket = await supertest(server)
    .post("/graphql")
    .set("Authorization", "Bearer " + accessToken)
    .send({
      query: `
        query {
          appealedTicket {
            id,
            appeal,
            appealReason
          }
        }
      `,
    });
  const appealedTicketId = appealedTicket.body.data.appealedTicket[0].id;
  expect(appealedTicket.body.data.appealedTicket[0].appeal).not.toBe(
    "approved"
  );

  console.log("Using ticket ID:", appealedTicketId);

  const approveTicket = await supertest(server)
    .post("/graphql")
    .set("Authorization", "Bearer " + accessToken)
    .send({
      query: `
        mutation {
          approveAppeal(id: "${appealedTicketId}") {
            id,
            appeal,
            appealReason
          }
        }
      `,
    });
  expect(approveTicket.body.data.approveAppeal.appeal).toEqual("approved");
});

test("reject an appeal", async () => {
  const appealedTicket = await supertest(server)
    .post("/graphql")
    .set("Authorization", "Bearer " + accessToken)
    .send({
      query: `
        query {
          appealedTicket {
            id,
            appeal,
            appealReason
          }
        }
      `,
    });
  const appealedTicketId = appealedTicket.body.data.appealedTicket[0].id;
  expect(appealedTicket.body.data.appealedTicket[0].appeal).not.toBe(
    "rejected"
  );

  const rejectTicket = await supertest(server)
    .post("/graphql")
    .set("Authorization", "Bearer " + accessToken)
    .send({
      query: `
        mutation {
          rejectAppeal(id: "${appealedTicketId}") {
            id,
            appeal,
            appealReason
          }
        }
      `,
    });
  expect(rejectTicket.body.data.rejectAppeal.appeal).toEqual("rejected");
});

test("Get all unpaid tickets for payroll", async () => {
  const driverId = "03845709-4d40-45fe-9e51-11789f6f209a";
  await supertest(server)
    .post("/graphql")
    .send({
      query: `
        query ($id: String!) {
          unpaidTicketCount(driverId: $id)
        }
      `,
      variables: {
        id: driverId,
      },
    })
    .then((res) => {
      console.log(res.body)
      expect(res.body.data.unpaidTicketCount).toEqual(3);
    });
});
