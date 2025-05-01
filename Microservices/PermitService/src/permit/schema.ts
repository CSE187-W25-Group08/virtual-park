import { Field, ID, ObjectType, GraphQLISODateTime } from 'type-graphql'
import { IsUUID, MaxLength, MinLength } from 'class-validator'

@ObjectType()
export class Permit {
  constructor(id: string, licenseNumber: string, issueDate: string, expDate: string) {
    this.id = id
    this.licenseNumber = licenseNumber
    this.issueDate = issueDate
    this.expDate = expDate
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
}