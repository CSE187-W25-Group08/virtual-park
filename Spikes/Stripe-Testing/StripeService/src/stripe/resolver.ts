import { Query, Resolver, Mutation, Int, Arg } from "type-graphql";
import { CheckoutSessionResponse, StripeConfig } from "./schema";
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

  /*
mutation {
  createCheckoutSession(quantity: 1) {
    id
    url
  }
}
  */
  @Mutation(() => CheckoutSessionResponse)
  async createCheckoutSession(
    @Arg("quantity", () => Int) quantity: number
  ): Promise<CheckoutSessionResponse> {


    const envPrice = process.env.PRICE;
    if (!envPrice) {
      throw Error()
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price: envPrice,
          quantity,
        },
      ],
      success_url: `${process.env.DOMAIN}/success.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.DOMAIN}/canceled.html`,
    });
    const sessionUrl = session.url;
    if (!sessionUrl) {
      throw Error();
    }

    return new CheckoutSessionResponse(session.id, sessionUrl);
  }
}
