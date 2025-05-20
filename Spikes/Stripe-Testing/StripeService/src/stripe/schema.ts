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