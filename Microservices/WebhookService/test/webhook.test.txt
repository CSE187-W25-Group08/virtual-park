import request from 'supertest'
import Stripe from 'stripe'
import * as http from "http";
import { beforeAll, afterAll} from "vitest";
import app from "../src/app";
import {it, expect} from 'vitest';

const stripeSecretkey = process.env.STRIPE_SECRET_KEY;
if (!stripeSecretkey) {
  throw stripeSecretkey;
}
const stripe = new Stripe(stripeSecretkey);

const webhookSecret = 'whsec_test_secret' 
let server: http.Server<
  typeof http.IncomingMessage,
  typeof http.ServerResponse
>;

beforeAll(async () => {
  server = http.createServer(app);
  server.listen();
});

afterAll(() => {
  //db.shutdown()
  server.close();
});

it('handles Stripe webhook event', async () => {
  // Create the raw body as Stripe would send it
  const eventPayload = {
    id: 'evt_test_webhook',
    object: 'event',
    type: 'checkout.session.completed',
    data: {
      object: {
        id: 'cs_test',
        amount_total: 2000,
        // ...add any fields your logic uses
      },
    },
  }

  const payloadString = JSON.stringify(eventPayload)

  const signature = stripe.webhooks.generateTestHeaderString({
    payload: payloadString,
    secret: webhookSecret,
  })

  const response = await request(app)
    .post('/webhook/stripe')
    .set('Stripe-Signature', signature)
    .set('Content-Type', 'application/json') // must match Stripe
    .send(payloadString) // send raw string, not object

  expect(response.status).toBe(200)
})
