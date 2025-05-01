
import { Card} from '@mui/material';
import { Ticket } from '../../ticket';

export default function TicketCard({ticket} : {ticket: Ticket}) {

  return (
    <Card sx={{ p: 2, border: '1px solid #ccc'}}>
      {ticket.description}
    </Card>
  );
}