import { Field, ObjectType, GraphQLISODateTime, ID} from 'type-graphql'
import { IsNumber, IsUUID} from 'class-validator'

@ObjectType()
export class Permit {
  constructor(issueDate: string, expDate: string, type: string, price: number) {
    this.issueDate = issueDate
    this.expDate = expDate
    this.type = type
    this.price = price
  }

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

@ObjectType()
export class PermitValid {
  constructor(driverID: string, issueDate: string, expDate: string, isValid: boolean) {
    this.driverID = driverID
    this.issueDate = issueDate
    this.expDate = expDate
    this.isValid = isValid
  }

  @Field(() => ID)
  @IsUUID()
  driverID!: string

  @Field()
  isValid!: boolean;

  @Field(() => GraphQLISODateTime)
  issueDate!: string

  @Field(() => GraphQLISODateTime)
  expDate!: string

}