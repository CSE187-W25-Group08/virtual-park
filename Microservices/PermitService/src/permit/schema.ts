import { Field, ObjectType, GraphQLISODateTime, ID} from 'type-graphql'
import { IsNumber, IsUUID} from 'class-validator'

@ObjectType()
export class Permit {
  constructor(id: string, issueDate: string, expDate: string, type: string, price: number, permitClass: string) {
    this.id = id
    this.issueDate = issueDate
    this.expDate = expDate
    this.type = type
    this.price = price
    this.permitClass = permitClass
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

  @Field()
  permitClass!: string;
}

@ObjectType()
export class PermitType {
  constructor( id: string, price: number, type: string, permitClass: string) {
    this.id = id
    this.type = type
    this.price = price
    this.permitClass = permitClass
  }
  @Field(() => ID)
  @IsUUID()
  id!: string

  @Field()
  type!: string

  @Field()
  @IsNumber()
  price!: number;

  @Field()
  permitClass!: string;
}

@ObjectType()
export class PermitValid {
  constructor( driverID: string, vehicleID: string, permitID: string | null, permitType: string | null, issueDate: string, expDate: string, isValid: boolean, permitClass: string) {
    this.driverID = driverID
    this.vehicleID = vehicleID
    this.permitID = permitID
    this.permitType = permitType
    this.issueDate = issueDate
    this.expDate = expDate
    this.isValid = isValid
    this.permitClass = permitClass
  }

  @Field(() => ID, {nullable: true})
  @IsUUID()
  permitID!: string | null

  @Field(() => ID, { nullable: true })
  @IsUUID()
  driverID!: string

  @Field(() => ID)
  @IsUUID()
  vehicleID!: string

  @Field(() => String, { nullable: true })
  permitType!: string | null;

  @Field(() => Boolean, { nullable: true })
  isValid!: boolean;

  @Field(() => GraphQLISODateTime, { nullable: true })
  issueDate!: string

  @Field(() => GraphQLISODateTime, { nullable: true })
  expDate!: string

  @Field(() => String, { nullable: true })
  permitClass!: string;
}

@ObjectType()
export class PermitIssue {
  constructor( driverID: string, vehicleID: string, permitID: string, permitType: string, issueDate: string, expDate: string, isValid: boolean, permitClass: string) {
    this.driverID = driverID
    this.vehicleID = vehicleID
    this.permitID = permitID
    this.permitType = permitType
    this.issueDate = issueDate
    this.expDate = expDate
    this.isValid = isValid
    this.permitClass = permitClass
  }

  @Field(() => ID)
  @IsUUID()
  permitID!: string

  @Field(() => ID)
  @IsUUID()
  driverID!: string

  @Field(() => ID)
  @IsUUID()
  vehicleID!: string

  @Field()
  permitType!: string;

  @Field()
  isValid!: boolean;

  @Field(() => GraphQLISODateTime)
  issueDate!: string

  @Field(() => GraphQLISODateTime)
  expDate!: string

  @Field()
  permitClass!: string;

}