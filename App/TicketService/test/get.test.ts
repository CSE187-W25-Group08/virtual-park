import { test, beforeAll, afterAll, expect } from "vitest";
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

const accessToken = 'Placeholder before authenticated implementation'

test("", async () => {
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
