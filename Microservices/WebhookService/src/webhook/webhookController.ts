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
  @Post("")
  public async handleStripePushNotification(
    @Request() request: express.Request,
    @Body() body: Buffer
  ): Promise<void> {
    const rawBody = body.toString("utf-8");
    const signature = request.headers["stripe-signature"] as string;

    if (typeof signature !== "string") {
      console.error("Missing Stripe signature header");
      throw new Error("Missing or invalid signature");
    }
    let event: Stripe.Event;

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) {
      throw webhookSecret;
    }
    try {
      event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      console.error("Webhook signature verification failed.", message);
      throw new Error(`Webhook Error: ${message}`);
    }

    // all events that can be handled by our webhook (we set these in Stripe dashboard)
    try {
      switch (event.type) {
        // here we can retrieeeve the item
        case "checkout.session.completed": {
          const session = event.data.object as Stripe.Checkout.Session;

          const retrievedSession = await stripe.checkout.sessions.retrieve(
            session.id,
            {
              expand: ["line_items", "line_items.data.price.product"],
            }
          );

          const lineItems = retrievedSession.line_items?.data;
          if (lineItems && lineItems.length > 0) {
            const product = lineItems[0].price?.product as Stripe.Product;

            console.log("Product name:", product.name);

            const type = product.metadata.type;
            const id = product.metadata.id;
            const driver = product.metadata.driver;

            console.log("Type:", type);
            console.log("ID:", id);
            console.log("Driver:", driver);
          }
          break;
        }

        case "payment_method.attached": {
          const paymentMethod = event.data.object as Stripe.PaymentMethod;
          console.log(`PaymentMethod attached: ${paymentMethod.id}`);
          break;
        }
        default:
          console.log(`Unhandled event type ${event.type}`);
          break;
      }
    } catch (eventErr) {
      const msg =
        eventErr instanceof Error ? eventErr.message : "Unknown error";
      console.error("Error handling webhook event:", msg);
      throw new Error("Internal Server Error");
    }
  }
}
