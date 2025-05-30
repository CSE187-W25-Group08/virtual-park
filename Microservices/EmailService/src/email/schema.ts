import { } from 'class-validator'
import { Field, InputType } from 'type-graphql'

@InputType()
export class PermitPaymentMetadataInput {
  @Field()
  permitTypeId: string;

  @Field()
  vehicleId: string;

  constructor() {
    this.permitTypeId = "";
    this.vehicleId = "";
  }
}