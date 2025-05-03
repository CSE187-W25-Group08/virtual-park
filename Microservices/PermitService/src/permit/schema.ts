import { Field, ID, ObjectType, GraphQLISODateTime } from 'type-graphql'
import { IsNumber, IsUUID} from 'class-validator'

@ObjectType()
export class Permit {
  constructor(issueDate: string, expDate: string, type: string) {
    // this.id = id
    this.issueDate = issueDate
    this.expDate = expDate
    this.type = type
  }

  // @Field(() => ID)
  // @IsUUID()
  // id!: string


  @Field(() => GraphQLISODateTime)
  issueDate!: string

  @Field(() => GraphQLISODateTime)
  expDate!: string

  @Field()
  type!: string

  // @Field()
  // @IsNumber()
  // price!: number;
}

@ObjectType()
export class PermitType {
  constructor(price: number, type: string) {
    this.type = type
    this.price = price
  }

  @Field()
  type!: string

  @Field()
  @IsNumber()
  price!: number;
}