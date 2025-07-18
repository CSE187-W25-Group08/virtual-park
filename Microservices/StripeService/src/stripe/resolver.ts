import { Authorized, Query, Resolver, Mutation, Int, Arg } from "type-graphql";
import { GraphQLJSONObject } from "graphql-type-json";
import //StripeConfig,
  "./schema";
import Stripe from "stripe";

@Resolver()
export class StripeResolver {

  @Query(() => String)
  dummy(): string {
    return "OK";
  }

  // https://chatgpt.com/c/68341091-d450-800d-b2cc-0652e5714a72 to get dyamcmetadata working
  @Authorized("driver")
  @Mutation(() => String)
  async createCheckoutSession(
    @Arg("amount", () => Int) amount: number,
    @Arg("name") name: string,
    @Arg("metadata", () => GraphQLJSONObject) metadata: Record<string, string>,
    @Arg("successUrl") successUrl: string,
    @Arg("cancelUrl") cancelUrl: string,
  ): Promise<string> {
    const stripeSecret = process.env.STRIPE_SECRET_KEY || "no key";
    // if (!stripeSecret) {
    //   console.log("test");
    //   throw new Error("Missing Stripe secret key");
    // }
    const stripe = new Stripe(stripeSecret);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: name,
              metadata: metadata
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      success_url: successUrl,
      cancel_url: cancelUrl,
    });

    if (!session.url) {
      throw new Error("Failed to create checkout session");
    }

    return session.url;
  }

  /*
  @Authorized("driver")
  @Mutation(() => PaymentIntentResponse)
  async createPaymentIntent(
    @Arg("amount", () => Int) amount: number
  ): Promise<PaymentIntentResponse> {
    const stripeSecret = process.env.STRIPE_SECRET_KEY;
    if (!stripeSecret) {
      throw Error();
    }
    const stripe = new Stripe(stripeSecret);

    console.log("createPaymentIntent called with amount:", amount);
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });
    const client_secret = paymentIntent.client_secret;

    if (!client_secret) {
      throw Error();
    }

    return {
      clientSecret: client_secret,
    };
  }
    */
}
