import { Field, ObjectType, InputType, Int } from "type-graphql"

@ObjectType()
export class Ticket {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field(type => Int)
  id!: number
  @Field(() => String)
  violation!: string 
}
