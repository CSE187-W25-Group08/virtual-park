import { Field, ID, ObjectType, GraphQLISODateTime } from 'type-graphql'
import { IsNumber, IsUUID} from 'class-validator'

@ObjectType()
export class Permit {
  constructor(id: string, issueDate: string, expDate: string, type: string, price: number) {
    this.id = id
    this.issueDate = issueDate
    this.expDate = expDate
    this.type = type
    this.price = price
  }

  @Field(() => ID)
  @IsUUID()
  id!: string


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