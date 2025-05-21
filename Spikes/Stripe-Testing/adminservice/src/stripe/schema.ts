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
export class PaymentIntentResponse {
  @Field()
  clientSecret: string;
  constructor(
    clientSecret: string,
  ) {
    this.clientSecret = clientSecret;
  }
}