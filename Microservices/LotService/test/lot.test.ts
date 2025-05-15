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


test("Gets all lots", async () => {
  await supertest(server)
    .post("/graphql")
    .set('Authorization', 'Bearer ' + accessToken)
    .send({
      query: `
        query {
          getAll {
            name
          }
        }
      `,
    })
    .then((res) => {
      expect(res.body.data.getAll[0].name).toBe("Area 51 Lot");

    });
});

test("Update lot at id", async () => {
  let lotId = 'dummy'
  await supertest(server)
    .post("/graphql")
    .set('Authorization', 'Bearer ' + accessToken)
    .send({
      query: `
        query {
          getAll {
            id
            name
          }
        }
      `,
    })
    .then((res) => {
      lotId = res.body.data.getAll[0].id
    });


    await supertest(server)
    .post("/graphql")
    .set('Authorization', 'Bearer ' + accessToken)
    .send({
      query: `
        mutation {
          putId(id: "${lotId}", data: {name: "Dragon", zone: "North"}) {
            id,
            name,
            zone, 
            address,
          }
        }
      `,
    })
    .then((res) => {
      expect(res.body.data.putId.name).toBe("Dragon");
    });


});



/*
test("Update lot at nonexistant id", async () => {
  const lotId = 'd5ad4c41-9510-4b6c-832c-2aaf99d27a96'


    await supertest(server)
    .post("/graphql")
    .set('Authorization', 'Bearer ' + accessToken)
    .send({
      query: `
        mutation {
          putId(id: "${lotId}", data: {name: "Dragon", zone: "North"}) {
            id,
            name,
            zone, 
            address,
          }
        }
      `,
    })
    .then((res) => {
      console.log(res.body.errors)
      // expect(res.body.data.putId.name).toBe("Dragon");

    });


});

/*
test("Gets all lots", async () => {
  await supertest(server)
    .post("/graphql")
    .set('Authorization', 'Bearer ' + accessToken)
    .send({
      query: `
        mutation {
          setTicketAppealed(id: "${unappealedTicketId}", appealStatus: "submitted") {
            id,
            appeal
          }
        }
      `,
    })
    .then((res) => {
      expect(res.body.data.getAll[0].name).toBe("Area 51 Lot");

    });
});

*/