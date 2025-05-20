import {
  Query,
  Resolver,
} from "type-graphql"
import { StripeConfig } from "./schema"; 
import { StripeService } from "./service"
import Stripe from "stripe";

const stripeSecret = process.env.STRIPE_SECRET_KEY
if (!stripeSecret) {
  throw Error();
}
const stripe = new Stripe(stripeSecret);

@Resolver()
export class StripeResolver {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query(returns => StripeConfig)
  async config(): Promise<StripeConfig> {
    if (!stripe) {
      throw Error();
    }

    const envPrice = process.env.PRICE 
    if (!envPrice) {
      throw Error();
    }

    const price = await stripe.prices.retrieve(envPrice);
    if (!price.unit_amount) {
      throw Error;
    }

    const envPubKey = process.env.STRIPE_PUBLISHABLE_KEY
    if (!envPubKey) {
      throw Error();
    }
    return {
      publicKey: envPubKey,
      unitAmount: price.unit_amount,
      currency: price.currency,
    }
  }

}
