import { test, beforeAll, expect, afterAll, afterEach } from 'vitest'
import supertest from 'supertest'
import * as http from 'http'

import * as db from './db'
import { app, bootstrap } from '../src/app'

let server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>

const anna = {
  email: 'anna@books.com',
  password: 'annaadmin'
}
const molly = {
  email: 'molly@books.com',
  password: 'mollymember'
}

async function getAccessToken(email: string, pwd: string): Promise<string> {
  const response = await supertest('http://localhost:3010')
    .post('/api/v0/auth/login')
    .send({ email: email, password: pwd })

  if (response.status !== 200) {
    throw new Error('Login failed')
  }

  return response.body.accessToken
}

beforeAll(async () => {
  server = http.createServer(app)
  await db.reset()
  await bootstrap()
})


afterAll(() => {
  db.shutdown()
  server.close()
})

afterEach(async () => {
  await db.reset()
})

test('Unauthorized calls to TicketService are rejected', async () => {
  await supertest(server)
    .post('/graphql')
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
      expect(res.body.errors).toBeDefined()
    })
})

test('Gets all tickets', async () => {
  const accessToken = await getAccessToken(anna.email, anna.password)

  await supertest(server)
    .post('/graphql')
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
      expect(res.body.data.ticket[0].violation).toEqual('expired meter')

    })
})

test('Get all paid tickets', async () => {
  const accessToken = await getAccessToken(anna.email, anna.password)

  await supertest(server)
    .post('/graphql')
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
      expect(res.body.data.paidTicket.length).toEqual(0)

    })
})

test('Get all unpaid tickets', async () => {
  const accessToken = await getAccessToken(anna.email, anna.password)

  await supertest(server)
    .post('/graphql')
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
      expect(res.body.data.unpaidTicket.length).toEqual(2)

    })
})

test('Get ticket with id', async () => {
  const accessToken = await getAccessToken(anna.email, anna.password)

  await supertest(server)
    .post('/graphql')
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
    })
})

test('Update ticket paid status', async () => {
  const accessToken = await getAccessToken(anna.email, anna.password)

  await supertest(server)
    .post('/graphql')
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
    })
})

test('Get all appealed tickets', async () => {
  const accessToken = await getAccessToken(molly.email, molly.password)

  await supertest(server)
    .post('/graphql')
    .set('Authorization', 'Bearer ' + accessToken)
    .send({
      query: `
        query {
          appealedTicket {
            violation
          }
        }
      `,
    })
    .then((res) => {
      expect(res.body.data.appealedTicket.length).toEqual(0)

    })
})

test('Get all active appealed ticket', async () => {
  const accessToken = await getAccessToken(molly.email, molly.password)

  await supertest(server)
    .post('/graphql')
    .set('Authorization', 'Bearer ' + accessToken)
    .send({
      query: `
        query {
          activeAppeals {
            violation
          }
        }
      `,
    })
    .then((res) => {
      expect(res.body.data.activeAppeals.length).toEqual(1)
    })
})