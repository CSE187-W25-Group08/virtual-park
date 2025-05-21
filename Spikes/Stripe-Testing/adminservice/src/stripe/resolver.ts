import { Query, Resolver, Mutation, Int, Arg } from "type-graphql";
import {
  PaymentIntentResponse,
  StripeConfig,
} from "./schema";
import Stripe from "stripe";

const stripeSecret = process.env.STRIPE_SECRET_KEY;
if (!stripeSecret) {
  throw Error();
}
const stripe = new Stripe(stripeSecret);

@Resolver()
export class StripeResolver {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query((returns) => StripeConfig)
  async config(): Promise<StripeConfig> {
    if (!stripe) {
      throw Error();
    }

    const envPrice = process.env.PRICE;
    if (!envPrice) {
      throw Error();
    }

    const price = await stripe.prices.retrieve(envPrice);
    if (!price.unit_amount) {
      throw Error;
    }

    const envPubKey = process.env.STRIPE_PUBLISHABLE_KEY;
    if (!envPubKey) {
      throw Error();
    }
    return {
      publicKey: envPubKey,
      unitAmount: price.unit_amount,
      currency: price.currency,
    };
  }



  @Mutation(() => PaymentIntentResponse)
  async createPaymentIntent(
    @Arg("amount", () => Int) amount: number
  ): Promise<PaymentIntentResponse> {

    console.log('createPaymentIntent called with amount:', amount);
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });
    const client_secret = paymentIntent.client_secret

    if (!client_secret) {
      throw Error()
    }

    return {
      clientSecret: client_secret,
    };
  }


}
