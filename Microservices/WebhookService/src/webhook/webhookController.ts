import { Request, Controller, Post, Route, Body } from "tsoa";

import express from "express";
import Stripe from "stripe";
import { setTicketPaidAction } from "../ticket/action";
import { setPermitTypePaid } from "../permit/action";
import { sendPermitEmailAction, sendTicketEmailAction } from "../email/action";

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
    // parsing information can ignore if you want to implement purchases flow
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

            console.log("=======Whose buying=======")
            const customerEmail = session.customer_details?.email || session.customer_email;
            const customerName = session.customer_details?.name;
            console.log("Customer email:", customerEmail);
            console.log("Customer name:", customerName);


            const dataName = product.name;
            const dataAmount = lineItems[0].price?.unit_amount;
            const dataType = product.metadata.type;


            console.log(process.env.MAILGUN_API_KEY || "API_KEY")
            // MARK: IMPLEMENT HEREEE
            console.log("=======Mandatory Fields=======")
            console.log("Product name:", dataName);
            console.log("Amount price:", dataAmount);
            console.log("Type:", dataType);

            switch(dataType) {
              case "ticket": {
                const metadata = product.metadata;
                const email = customerEmail || "test@books.com";
                const name = customerName || "Test User";
                const productName = dataName || "Test Product name";
                const costOfProduct = dataAmount || 0;
                const ticketId = metadata.id as string;
                const cookie = metadata.cookie as string;
                await sendTicketEmailAction(email, name, productName, costOfProduct, ticketId, cookie);
                await setTicketPaidAction(metadata);
                break;
              }
              case "permit": {
                // parse data for email
                const metadata = product.metadata;
                const email = customerEmail || "test@books.com";
                const name = customerName || "Test User";
                const productName = dataName || "Test Product name";
                const costOfProduct = dataAmount || 0;
                const permitTypeId = metadata.permitTypeId as string;
                const vehicleId = metadata.vehicleId as string;
                const cookie = metadata.cookie as string;
                const price = Number(metadata.price);

                // email
                await sendPermitEmailAction(email, name, productName, costOfProduct, permitTypeId, vehicleId, cookie);
                // databsae
                await setPermitTypePaid(permitTypeId, vehicleId, cookie, price);
                break;
              }
              default: {
                console.log('Meow something went wrong')
                break;
              }
            }

          }
          break;
        }

        /*
        case "payment_method.attached": {
          const paymentMethod = event.data.object as Stripe.PaymentMethod;
          console.log(`PaymentMethod attached: ${paymentMethod.id}`);
          break;
        }
          */
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
