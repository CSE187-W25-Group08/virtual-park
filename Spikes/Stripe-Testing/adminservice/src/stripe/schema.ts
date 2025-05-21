import { } from 'class-validator'
import { Field, Int, ObjectType, } from 'type-graphql'

@ObjectType()
export class StripeConfig {
  @Field()
  publicKey: string;

  @Field(() => Int)
  unitAmount: number;

  @Field()
  currency: string;

  constructor(
    publicKey: string,
    unitAmount: number,
    currency: string
  ) {
    this.publicKey = publicKey;
    this.unitAmount = unitAmount;
    this.currency = currency;
  }
}

@ObjectType()
export class CheckoutSessionResponse {
  @Field()
  id: string;

  @Field()
  url: string;

  constructor(id: string, url: string) {
    this.id = id;
    this.url = url;
  }
}


@ObjectType()
export class CheckoutSession {
  @Field()
  id: string;

  @Field(() => String, { nullable: true })
  payment_status?: string;

  @Field(() => String, { nullable: true })
  customer_email?: string | null;

  @Field(() => Int, { nullable: true })
  amount_total?: number | null;

  constructor(
    id: string,
    payment_status?: string,
    customer_email?: string | null,
    amount_total?: number | null
  ) {
    this.id = id;
    this.payment_status = payment_status;
    this.customer_email = customer_email;
    this.amount_total = amount_total;
  }
}