import { Authorized, Query, Resolver, Mutation, Arg } from "type-graphql";
import { sendPermitPaymentConfirmation } from "./service";
import { PermitPaymentMetadataInput } from "./schema";

@Resolver()
export class StripeResolver {
  @Query(() => String)
  dummy(): string {
    return "OK";
  }

@Authorized("driver")
@Mutation(() => String)
async sendPermitPaymentEmail(
  @Arg("email") email: string,
  @Arg("name") name: string,
  @Arg("nameOfProduct") nameOfProduct: string,
  @Arg("costOfProduct") costOfProduct: number,
  @Arg("metadata") metadata: PermitPaymentMetadataInput
): Promise<boolean> {
  await sendPermitPaymentConfirmation(email, name, nameOfProduct, costOfProduct, { ...metadata } );
  return true
}
}
