import { IsUUID, MaxLength, MinLength } from 'class-validator'
import { Field, ID, ObjectType } from 'type-graphql'

@ObjectType()
export class Vehicle {
  constructor(id: string, licensePlate: string, driver: string, make: string, model: string, color: string) {
    this.id = id
    this.licensePlate = licensePlate
    this.driver = driver
    this.make = make
    this.model = model
    this.color = color
  }

  @Field(() => ID)
  @IsUUID()
  id!: string
  @Field()
  @MinLength(1)
  @MaxLength(8)
  licensePlate!: string
  @Field()
  driver!: string
  @Field()
  make!: string
  @Field()
  model!: string
  @Field()
  color!: string
}