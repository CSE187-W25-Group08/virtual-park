import { getUserIdFromEmail } from "../auth/service";
import { unpaidTicketPayrollCount } from "../ticket/service";

export async  function emailContainsTickets(email: string): Promise<boolean> {
    try {
      const driverId = await getUserIdFromEmail(email);
      if (!driverId) {
        return false;
      }
      const unpaidTicketCount = await unpaidTicketPayrollCount(driverId);
      if (unpaidTicketCount > 0) {
        return true;
      } else {
        return false;
      }
    } catch {
      return false;
    }


}