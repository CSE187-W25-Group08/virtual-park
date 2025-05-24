import { Authorized, Query, Mutation, Resolver, Ctx, Arg } from 'type-graphql'
import { Vehicle, RegisterVehicle, VehicleIdInput, EditVehicleInput } from './schema'
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
}

