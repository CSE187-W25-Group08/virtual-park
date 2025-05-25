import { Ctx, Authorized, Query, Resolver, Mutation, Int, Arg } from "type-graphql";
import { Request } from "express"
import //StripeConfig,
"./schema";
import Stripe from "stripe";

@Resolver()
export class StripeResolver {
  @Query(() => String)
  dummy(): string {
    return "OK";
  }

  @Authorized("driver")
  @Mutation(() => String)
  async createCheckoutSession(
    @Arg("amount", () => Int) amount: number,
    @Arg("name") name: string,
    @Arg("type") type: string, //ticket permit (all trinkets and baubles)
    @Arg("id") id: string, //id of permit or ticket etc (all trinkets and baubles)
    @Arg("successUrl") successUrl: string,
    @Arg("cancelUrl") cancelUrl: string,
    @Ctx() request: Request
  ): Promise<string> {
    const stripeSecret = process.env.STRIPE_SECRET_KEY;
    // console.log(stripeSecret)
    if (!stripeSecret) {
      console.log("test");
      throw new Error("Missing Stripe secret key");
    }
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
              metadata: {
                type: type,
                id: id,
                driver: String(request.user?.id)
              },
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
    // console.log(stripeSecret)
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
