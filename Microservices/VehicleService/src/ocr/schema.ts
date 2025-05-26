import { Field, ObjectType } from 'type-graphql'
@ObjectType()
export class ScanResult {
  @Field(() => String)
  licensePlate?: string;
}