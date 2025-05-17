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
    return await new VehicleService().getVehicleById(request.user?.id, id)
  }

  @Authorized()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query(returns => [Vehicle])
  async userVehicle(@Ctx() request: Request): Promise<Vehicle[]> {
    return await new VehicleService().getUserVehicles(request.user?.id)
  }

  @Authorized()
  @Mutation(() => Vehicle)
  async registerVehicle(@Ctx() request: Request, @Arg("input") input: RegisterVehicle): Promise<Vehicle> {
    return await new VehicleService().registerVehicle(request.user?.id, input)
  }

  @Authorized()
  @Query(() => Vehicle, { nullable: true })
  async primaryVehicle(@Ctx() request: Request): Promise<Vehicle | null> {
    return await new VehicleService().getPrimaryVehicle(request.user?.id)
  }

  @Authorized()
  @Mutation(() => Vehicle, { nullable: true })
  async updatePrimaryVehicle(@Ctx() request: Request, @Arg("input") input: VehicleIdInput): Promise<Vehicle | null> {
    const addedVehicle = await new VehicleService().getVehicleById(request.user?.id, input.id)
    if (addedVehicle.active) {
      return await new VehicleService().updatePrimaryVehicle(request.user?.id, input.id)
    } 
    return null;
  }

  @Authorized()
  @Mutation(() => Vehicle)
  async editVehicle(@Ctx() request: Request, @Arg("input") input: EditVehicleInput): Promise<Vehicle> {
    return await new VehicleService().editVehicle(request.user?.id, input)
  }
}