import { Field, ID, ObjectType, GraphQLISODateTime } from 'type-graphql'
import { IsNumber, IsUUID, MaxLength, MinLength } from 'class-validator'

@ObjectType()
export class Permit {
  constructor(id: string, licenseNumber: string, issueDate: string, expDate: string, type: string, price: number) {
    this.id = id
    this.licenseNumber = licenseNumber
    this.issueDate = issueDate
    this.expDate = expDate
    this.type = type
    this.price = price
  }

  @Field(() => ID)
  @IsUUID()
  id!: string

  @Field()
  @MinLength(1)
  @MaxLength(8)
  licenseNumber!: string

  @Field(() => GraphQLISODateTime)
  issueDate!: string

  @Field(() => GraphQLISODateTime)
  expDate!: string

  @Field()
  type!: string

  @Field()
  @IsNumber()
  price!: number;
}