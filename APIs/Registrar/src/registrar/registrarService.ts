import { getUserIdFromEmail } from "../auth/service";
import { unpaidTicketRegistrarCount } from "../ticket/service"

export async  function emailContainsTickets(email: string): Promise<boolean> {
    try {
      const driverId = await getUserIdFromEmail(email);

      const unpaidTicketCount = await unpaidTicketRegistrarCount(driverId);
      if (unpaidTicketCount > 0) {
        return true;
      } else {
        return false;
      }
    } catch {
      return false;
    }


}