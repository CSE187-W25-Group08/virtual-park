import { Field, ID, ObjectType } from 'type-graphql';
import { IsUUID, IsString, IsNumber, IsBoolean, IsDateString, IsLatitude, IsLongitude } from 'class-validator';

@ObjectType()
export class Lot {
  constructor(
    id: string,
    name: string,
    zone: string,
    address: string,
    latitude: number,
    longitude: number,
    capacity: number,
    availableSpots: number,
    isActive: boolean,
    type: string,
    created: string,
    updated: string
  ) {
    this.id = id;
    this.name = name;
    this.zone = zone;
    this.address = address;
    this.latitude = latitude;
    this.longitude = longitude;
    this.capacity = capacity;
    this.availableSpots = availableSpots;
    this.isActive = isActive;
    this.type = type;
    this.created = created;
    this.updated = updated;
  }

  @Field(() => ID)
  @IsUUID()
  id!: string;

  @Field()
  @IsString()
  name!: string;

  @Field()
  @IsString()
  zone!: string;

  @Field()
  @IsString()
  address!: string;

  @Field()
  @IsLatitude()
  latitude!: number;

  @Field()
  @IsLongitude()
  longitude!: number;

  @Field()
  @IsNumber()
  capacity!: number;

  @Field()
  @IsNumber()
  availableSpots!: number;

  @Field()
  @IsBoolean()
  isActive!: boolean;

  @Field()
  @IsString()
  type!: string;

  @Field()
  @IsDateString()
  created!: string;

  @Field()
  @IsDateString()
  updated!: string;
}

@ObjectType()
export class DBLot {
  @Field(() => ID)
  id!: string

  @Field(() => Lot)
  data!: Lot
}