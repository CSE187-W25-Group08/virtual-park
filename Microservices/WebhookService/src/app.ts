/*
#######################################################################
#
# Copyright (C) 2022-2025 David C. Harrison. All right reserved.
#
# You may not use, distribute, publish, or modify this code without 
# the express written permission of the copyright holder.
#
#######################################################################
*/
/*
#######################################################################
#                   DO NOT MODIFY THIS FILE
#######################################################################
*/

import express, {
  Express,
  ErrorRequestHandler,
  NextFunction,
} from "express";
import cors from "cors";
import Stripe from "stripe";

const stripeSecretkey = process.env.STRIPE_SECRET_KEY;
if (!stripeSecretkey) {
  throw stripeSecretkey;
}
// generated with stripe cli (stripe listen) for testing. For env file in dev use webhook api
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
if (!webhookSecret) {
  throw webhookSecret;
}

const stripe = new Stripe(stripeSecretkey);

const app: Express = express();
app.use(cors());

// https://chatgpt.com/c/6830201d-2aac-800d-b197-fb38c1ba3324 conversion to ts from js 
// folowing stripe docs https://docs.stripe.com/webhooks/quickstart

// cannot be used with tsoa because stripe sends a rew body to secure it
// stripe has its own middle ware funcitons for parsing the intent
app.post('/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  const signature = req.headers['stripe-signature']
  if (typeof signature !== 'string') {
    console.error('Missing Stripe signature header')
    res.status(400).send('Missing or invalid signature')
    return
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(req.body, signature, webhookSecret)
  } catch (err) {
    if (err instanceof Error) {
      console.error('Webhook signature verification failed.', err.message)
      res.status(400).send(`Webhook Error: ${err.message}`)
      return
    } else {
      console.error('Unknown webhook verification error', err)
      res.status(400).send('Webhook Error')
      return
    }
  }

  try {
    switch (event.type) {
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`)
        break
      }
      case 'payment_method.attached': {
        const paymentMethod = event.data.object as Stripe.PaymentMethod
        console.log(`PaymentMethod attached: ${paymentMethod.id}`)
        break
      }
      default:
        console.log(`Unhandled event type ${event.type}`)
        break
    }
  } catch (eventErr) {
    if (eventErr instanceof Error) {
      console.error('Error handling webhook event:', eventErr.message)
    } else {
      console.error('Unknown error handling webhook event:', eventErr)
    }
    res.status(500).send('Internal Server Error')
    return
  }

  res.status(200).send('Received')
})

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const errorHandler: ErrorRequestHandler = (
  err,
  _req,
  res,
  _next: NextFunction
) => {
  res.status(err.status).json({
    message: err.message,
    errors: err.errors,
    status: err.status,
  });
  _next();
};
app.use(errorHandler);

export default app;
