import { Authorized, Query, Resolver, Mutation, Arg } from "type-graphql";
import {
  sendPermitPaymentConfirmation,
  sendTicketAppealAccepted,
  sendTicketAppealRejected,
  sendTicketPaymentConfirmation,
} from "./service";

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
    @Arg("permitTypeId") permitTypeId: string
  ): Promise<boolean> {
    await sendPermitPaymentConfirmation(
      email,
      name,
      nameOfProduct,
      costOfProduct,
      vehicleId,
      permitTypeId
    );
    return true;
  }
  @Authorized()
  @Mutation(() => String)
  async sendTicketPaymentEmail(
    @Arg("email") email: string,
    @Arg("name") name: string,
    @Arg("nameOfProduct") nameOfProduct: string,
    @Arg("costOfProduct") costOfProduct: number,
    @Arg("ticketId") ticketId: string
  ): Promise<boolean> {
    await sendTicketPaymentConfirmation(
      email,
      name,
      nameOfProduct,
      costOfProduct,
      ticketId
    );
    return true;
  }
  @Authorized()
  @Mutation(() => String)
  async sendTicketAppealRejectedEmail(
    @Arg("email") email: string,
    @Arg("name") name: string,
    @Arg("ticketId") ticketId: string,
    @Arg("violation") violation: string,
  ): Promise<boolean> {
    await sendTicketAppealRejected(
      email,
      name,
      ticketId,
      violation
    );
    return true;
  }
  @Authorized()
  @Mutation(() => String)
  async sendTicketAppealAcceptedEmail(
    @Arg("email") email: string,
    @Arg("name") name: string,
    @Arg("ticketId") ticketId: string,
    @Arg("violation") violation: string,
  ): Promise<boolean> {
    await sendTicketAppealAccepted(
      email,
      name,
      ticketId,
      violation
    );
    return true;
  }
}
