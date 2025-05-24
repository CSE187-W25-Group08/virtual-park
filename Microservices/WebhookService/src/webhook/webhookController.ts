import { Request, Controller, Post, Route, Body } from "tsoa";

import express from "express";
import Stripe from "stripe";

const stripeSecretkey = process.env.STRIPE_SECRET_KEY;
if (!stripeSecretkey) {
  throw stripeSecretkey;
}
const stripe = new Stripe(stripeSecretkey);


@Route("webhook")
export class WebhookController extends Controller {
  @Post("doesnt matter?")
  public async handleStripePushNotification(
    @Request() request: express.Request,
    @Body() body: Buffer
  ): Promise<void> {
    const rawBody = body.toString("utf-8");
    const signature = request.headers["stripe-signature"] as string;

    if (typeof signature !== 'string') {
      console.error('Missing Stripe signature header')
      throw new Error('Missing or invalid signature')
    }
    let event: Stripe.Event

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) {
      throw webhookSecret;
    }
    try {
      event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error'
      console.error('Webhook signature verification failed.', message)
      throw new Error(`Webhook Error: ${message}`)
    }

    try {
      switch (event.type) {
        case 'payment_intent.succeeded': {
          const paymentIntent = event.data.object as Stripe.PaymentIntent
          console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`)
          // TODO: Save permit to DB here
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
      const msg = eventErr instanceof Error ? eventErr.message : 'Unknown error'
      console.error('Error handling webhook event:', msg)
      throw new Error('Internal Server Error')
    }
  }
}
