import { IsUUID, IsDateString, IsNumber} from 'class-validator'
import { Field, ID, ObjectType, } from 'type-graphql'

@ObjectType()
export class Ticket {
  constructor(
    id: string,
    vehicle: string,
    enforcer: string,
    lot: string,
    paid: boolean,
    description: string,
    due: string,
    issue: string,
    violation: string,
    cost: number,
    appeal: string,
    appealReason: string,
    image?: string,
  ) {
    this.id = id;
    this.vehicle = vehicle;
    this.enforcer = enforcer;
    this.lot = lot;
    this.paid = paid;
    this.description = description;
    this.due = due;
    this.issue = issue;
    this.violation = violation;
    this.image = image || '';
    this.cost = cost;
    this.appeal = appeal;
    this.appealReason = appealReason;
  }

  @Field(() => ID)
  @IsUUID()
  id!: string;

  @Field({nullable:true})
  vehicle?: string;

  @Field()
  enforcer: string;

  @Field()
  lot!: string;

  @Field()
  paid!: boolean;

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

  @Field({nullable: true})
  image?: string;

  @Field()
  @IsNumber()
  cost!: number;

  @Field()
  appeal!: string;

  @Field()
  appealReason!: string;
}

@ObjectType()
export class DBTicket {
  @Field(() => ID)
  id!: string

  @Field(() => Ticket)
  data!: Ticket
}


