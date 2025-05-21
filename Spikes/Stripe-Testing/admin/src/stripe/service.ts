import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
const stripeSecretKey = process.env.STRIPE_SECRET_KEY

if (!stripeSecretKey) {
  throw Error();
}


const stripe = new Stripe(stripeSecretKey)

export function POST(request: NextRequest): Promise<NextResponse> {
  return new Promise((resolve, reject) => {
    request.json()
      .then(({ amount }) => {
        return stripe.paymentIntents.create({
          amount: amount,
          currency: "usd",
          automatic_payment_methods: { enabled: true },
        });
      })
      .then((paymentIntent) => {
        resolve(NextResponse.json({ clientSecret: paymentIntent.client_secret }));
      })
      .catch((error) => {
        reject(error);
      });
  });
}

