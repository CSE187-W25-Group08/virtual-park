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
    console.log("users permits", perms)
    return perms
  }

  @Authorized()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query(returns => [PermitType])
  async PermitType(
  ): Promise<PermitType[]> {
    return await new PermitService().getPermitType()
  }

  /* should Only allow officer to do that, and in the future, I might consider adding a member with the role of enforcement officer */
  @Authorized('enforcement')
  @Query(returns => [PermitValid])
  async getPermitBycarPlate(@Arg("input") carPlate: string): Promise<PermitValid[]> {
      const result = await new PermitService().getPermitByCar(carPlate);
      // console.log('GraphQL resolver received:', result); 
      return result || [];
  }

  @Authorized()
  @Query(() => Permit, { nullable: true })
  async validPermit(
    @Ctx() Request: Request
  ): Promise<Permit | null> {
    return await new PermitService().getValidPermit(Request.user?.id)
  }

  @Authorized()
  @Mutation(() => PermitIssue)
  async issuePermit(
    @Arg("permitTypeId") permitTypeId: string,
    @Arg("vehicleId") vehicleId: string,
    @Ctx() Request: Request
  ): Promise<PermitIssue> {
    const driverId = Request.user?.id;
    if (!driverId) {
      throw new Error("UserID invalid");
    }
    console.log("issued new permit called")
    const permitType = await new PermitService().getSpecificPermitType(permitTypeId)
    /* year, month, week, daily */
    const issueDate = new Date();
    const expDate = new Date(issueDate);
    if (permitType.type === 'Daily') {
      expDate.setHours(23, 59, 59, 999);
    } else if (permitType.type === 'Week') {
      expDate.setDate(expDate.getDate() + 7);
    } else if (permitType.type === 'Month') {
      expDate.setMonth(expDate.getMonth() + 1);
    } else if (permitType.type === 'Year') {
      expDate.setFullYear(expDate.getFullYear() + 1)
    }
    const newPermit = await new PermitService().permitIssue({
      driverID: driverId,
      vehicleID: vehicleId,
      permitType: permitTypeId,
      issueDate: issueDate.toISOString(),
      expDate: expDate.toISOString(),
      isValid: true,
      price: permitType.price
    });
    console.log("issued new permit in resolver", newPermit)
    return newPermit;
  }
}

