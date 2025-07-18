import { Authorized, Query, Mutation, Resolver, Ctx, Arg } from 'type-graphql'
import { Vehicle, RegisterVehicle, VehicleIdInput, EditVehicleInput, UnRegisterVehicle } from './schema'
import { Request } from "express"
import { VehicleService } from './service'

@Resolver()
export class VehicleResolver {
  @Authorized("admin")
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query(returns => [Vehicle])
  async vehicle(
  ): Promise<Vehicle[]> {
    return await new VehicleService().getAll()
  }

  @Authorized()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query(returns => Vehicle)
  async getVehicleById(@Arg("id") id: string, @Ctx() request: Request): Promise<Vehicle> {
    return await new VehicleService().getVehicleById(id, request.user?.id)
  }

  @Authorized()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query(returns => Vehicle)
  async getVehicleByPlate(@Arg("plate") plate: string): Promise<Vehicle> {
    return await new VehicleService().getVehicleByPlate(plate)
  }

  @Authorized()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query(returns => [Vehicle])
  async userVehicle(@Ctx() request: Request): Promise<Vehicle[]> {
    return await new VehicleService().getUserVehicles(request.user?.id)
  }

  @Authorized("driver")
  @Mutation(() => Vehicle)
  async registerVehicle(@Ctx() request: Request, @Arg("input") input: RegisterVehicle): Promise<Vehicle> {
    return await new VehicleService().registerVehicle(request.user?.id, input)
  }

  @Authorized("enforcement")
  @Mutation(() => UnRegisterVehicle)
  async UnregisterVehicle(@Arg("input") input: string): Promise<UnRegisterVehicle> {
    return await new VehicleService().UnregisterVehicle(input)
  }

  @Authorized("driver")
  @Query(() => Vehicle, { nullable: true })
  async primaryVehicle(@Ctx() request: Request): Promise<Vehicle | null> {
    return await new VehicleService().getPrimaryVehicle(request.user?.id)
  }

  @Authorized("driver")
  @Mutation(() => Vehicle, { nullable: true })
  async updatePrimaryVehicle(@Ctx() request: Request, @Arg("input") input: VehicleIdInput): Promise<Vehicle | null> {
    const addedVehicle = await new VehicleService().getVehicleById(input.id, request.user?.id);
    if (addedVehicle.active) {
      return await new VehicleService().updatePrimaryVehicle(request.user?.id, input.id)
    }
    return null;
  }

  @Authorized("driver")
  @Mutation(() => Vehicle)
  async editVehicle(@Ctx() request: Request, @Arg("input") input: EditVehicleInput): Promise<Vehicle> {
    return await new VehicleService().editVehicle(request.user?.id, input)
  }

  @Authorized("admin")
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query(returns => Vehicle)
  async getAnyVehicleById(@Arg("id") id: string): Promise<Vehicle> {
    return await new VehicleService().getVehicleByIdAdmin(id)
  }

  @Authorized("enforcement")
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query(returns => Vehicle, { nullable: true })
  async getVehicleByDriverOrPlate(@Arg("driver") driver: string, @Arg("plate") plate: string): Promise<Vehicle | null> {
    // if unregistered vehicle, search from plate
    if (!driver) {
      return null
    } else {
      // match user and plate
      const userVehicles = await new VehicleService().getUserVehicles(driver)
      const matchedVehicle = userVehicles.find(
        vehicle => vehicle.licensePlate.toLowerCase() === plate.toLowerCase()
      );

      if (!matchedVehicle) {
        throw new Error("Vehicle with that plate not found for this driver.");
      }

      console.log('matched: ', matchedVehicle)
      return matchedVehicle;
    }
  }
}

