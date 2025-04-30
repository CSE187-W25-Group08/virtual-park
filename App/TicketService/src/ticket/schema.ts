import { IsUUID, MaxLength, MinLength, IsDateString} from 'class-validator'
import { Field, ID, ObjectType, } from 'type-graphql'

@ObjectType()
export class Ticket {
  constructor(
    id: string,
    vehicle: string,
    enforcer: string,
    lot: string,
    status: string,
    description: string,
    due: string,
    issue: string,
    violation: string,
    image: string
  ) {
    this.id = id;
    this.vehicle = vehicle;
    this.enforcer = enforcer;
    this.lot = lot;
    this.status = status;
    this.description = description;
    this.due = due;
    this.issue = issue;
    this.violation = violation;
    this.image = image;
  }

  @Field(() => ID)
  @IsUUID()
  id!: string;

  @Field()
  vehicle!: string;

  @Field()
  enforcer!: string;

  @Field()
  lot!: string;

  @Field()
  status!: string;

  @Field()
  description!: string;

  @Field()
  @IsDateString()
  due!: string;

  @Field()
  @IsDateString()
  issue!: string;

  @Field()
  violation!: string;

  @Field()
  image!: string;
}