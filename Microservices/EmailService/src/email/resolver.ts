import { Authorized, Query, Resolver, Mutation, Arg } from "type-graphql";
import { sendPermitPaymentConfirmation } from "./service";

@Resolver()
export class StripeResolver {
  @Query(() => String)
  dummy(): string {
    return "OK";
  }

@Authorized()
@Mutation(() => String)
async sendPermitPaymentEmail(
  @Arg("email") email: string,
  @Arg("name") name: string,
  @Arg("nameOfProduct") nameOfProduct: string,
  @Arg("costOfProduct") costOfProduct: number,
  @Arg("vehicleId") vehicleId: string,
  @Arg("permitTypeId") permitTypeId: string,
): Promise<boolean> {
  await sendPermitPaymentConfirmation(email, name, nameOfProduct, costOfProduct, vehicleId, permitTypeId);
  return true
}
}
