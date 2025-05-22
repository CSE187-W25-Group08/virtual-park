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
  @Field({nullable:true})
  driver?: string
  @Field({nullable:true})
  make?: string
  @Field({nullable:true})
  model?: string
  @Field({nullable:true})
  color?: string
  @Field({nullable:true})
  active?: boolean;
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
  @Field()
  active!: boolean;
}

@InputType()
export class VehicleIdInput {
  @Field()
  id!: string;
}

@InputType()
export class EditVehicleInput extends RegisterVehicle {
  @Field()
  id!: string;
}
