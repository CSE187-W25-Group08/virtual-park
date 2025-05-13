import { IsUUID, MaxLength, MinLength } from 'class-validator'
import { Field, ID, ObjectType, InputType } from 'type-graphql'

@ObjectType()
export class Vehicle {
  constructor(id: string, licensePlate: string, driver: string, make: string, model: string, color: string, active: boolean) {
    this.id = id
    this.licensePlate = licensePlate
    this.driver = driver
    this.make = make
    this.model = model
    this.color = color
    this.active = active
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
  @Field({defaultValue: true})
  active!: boolean;
}

@InputType()
export class RegisterVehicle {
  @Field()
  @MinLength(1)
  @MaxLength(8)
  licensePlate!: string

  @Field()
  make!: string

  @Field()
  model!: string

  @Field()
  color!: string
  @Field({defaultValue: true})
  active!: boolean;
}