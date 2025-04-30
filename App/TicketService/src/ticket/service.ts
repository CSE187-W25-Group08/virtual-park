import * as db from './db';
import { Ticket } from './schema';

export class PostService {
  
  public async getAllTicket(userId: string): Promise<Ticket[]> {
    const ticket = await db.selectAllTickets(userId);





    return ticket
  }


}
