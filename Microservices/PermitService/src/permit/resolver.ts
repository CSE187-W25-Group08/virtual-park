import { Authorized, Ctx, Query, Resolver, Arg, Mutation } from 'type-graphql'
import { Permit, PermitType, PermitValid, PermitIssue } from './schema'
import { Request } from "express"
import { PermitService } from './service'

@Resolver()
export class PermitResolver {
  @Authorized()
  @Query(() => [Permit])
  async permitsByDriver(
    @Ctx() Request: Request
  ): Promise<Permit[]> {
    const perms = await new PermitService().getPermitByDriver(Request.user?.id)
    // console.log("users permits", perms)
    return perms
  }

  @Authorized()
  @Query(() => [PermitType])
  async buyablePermits(
    @Ctx() Request: Request
  ): Promise<PermitType[]> {
    const perms = await new PermitService().getBuyablePermits(Request.user?.id)
    console.log("Buyable permits resolver: ", perms[0])
    return perms
  }

  @Authorized()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query(returns => [PermitType])
  async PermitType(
  ): Promise<PermitType[]> {
    return await new PermitService().getPermitType()
  }

  @Authorized()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query(returns => PermitType)
  async getDailyPermitType(
    @Arg("driverClass") driverClass: string,
  ): Promise<PermitType> {
    return await new PermitService().getSpecificDailyPermit(driverClass)
  }

  /* should Only allow officer to do that, and in the future, I might consider adding a member with the role of enforcement officer */
  @Authorized('enforcement')
  @Query(() => [PermitValid])
  async getPermitBycarPlate(@Arg("input") carPlate: string): Promise<PermitValid[]> {
    const result = await new PermitService().getPermitByCar(carPlate);
    return result || [];
  }

  @Authorized()
  @Query(() => [Permit], { nullable: true })
  async validPermit(
    @Ctx() Request: Request
  ): Promise<Permit[] | null> {
    return await new PermitService().getValidPermit(Request.user?.id)
  }

  @Authorized()
  @Query(() => [Permit], { nullable: true })
  async futurePermit(
    @Ctx() Request: Request
  ): Promise<Permit[] | null> {
    return await new PermitService().getFuturePermit(Request.user?.id)
  }

  @Authorized()
  @Mutation(() => PermitIssue)
  async issuePermit(
    @Arg("permitTypeId") permitTypeId: string,
    @Arg("vehicleId") vehicleId: string,
    @Arg("price") price: number,
    @Ctx() Request: Request
  ): Promise<PermitIssue> {
    const driverId = Request.user?.id;
    if (!driverId) {
      throw new Error("UserID invalid");
    }
    // console.log("issued new permit called")
    const permitType = await new PermitService().getSpecificPermitType(permitTypeId)
    /* academic year, year, quarter, month, week, daily, hourly */
    const issueDate = new Date();
    const expDate = new Date(issueDate);
    if (permitType.type === 'Daily') {
      expDate.setDate(expDate.getDate() + 1);
      expDate.setHours(6, 59, 0, 0);
    } else if (permitType.type === 'Hourly') {
      expDate.setHours(expDate.getHours() + (price / 2));
    } else if (permitType.type === 'Week') {
      expDate.setDate(expDate.getDate() + 7);
    } else if (permitType.type === 'Month') {
      expDate.setMonth(expDate.getMonth() + 1);
    } else if (permitType.type === 'Quarter') {
      expDate.setMonth(expDate.getMonth() + 3);
    } else if (permitType.type === 'Year') {
      expDate.setFullYear(expDate.getFullYear() + 1)
    } else if (permitType.type === 'Academic Year') {
      issueDate.setMonth(8);
      issueDate.setDate(0);
      expDate.setMonth(5);
      expDate.setDate(29);
      expDate.setFullYear(expDate.getFullYear() + 1);
    }
    const newPermit = await new PermitService().permitIssue({
      driverID: driverId,
      vehicleID: vehicleId,
      permitType: permitTypeId,
      issueDate: issueDate.toISOString(),
      expDate: expDate.toISOString(),
      isValid: true,
      price: price,
      permitClass: permitType.permitClass
    });
    // console.log("issued new permit in resolver", newPermit)
    return newPermit;
  }

   
  @Query(() => [PermitValid])
  async getPermitByPlateAPI(
    @Arg("input") licensePlate: string
  ): Promise<PermitValid[]> {
    const result = await new PermitService().getPermitByCar(licensePlate)
    return result || []
  }
}

