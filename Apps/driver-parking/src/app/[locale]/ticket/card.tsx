
import { Card, Typography} from '@mui/material';
import Box from '@mui/material/Box';
import { Ticket } from '../../../ticket';
import ListItemButton from '@mui/material/ListItemButton';
import { useRouter } from 'next/navigation'

export default function TicketCard({ticket} : {ticket: Ticket}) {
  const router = useRouter()

  const handleHourDate = (dateArg: string) => {
  const dateReceived = new Date(dateArg);

  const month = dateReceived.getMonth() + 1;
  const day = dateReceived.getDate();
  const year = dateReceived.getFullYear();

  return `${month}/${day}/${year}`;
  };

  const handleClick = (ticketId: string) => {
    console.log(ticketId);
    router.push('ticket/' + ticketId)

  }


  return (
    <ListItemButton onClick={() => {handleClick(ticket.id)}}>
    <Card sx={{ p: 2, border: '1px solid #ccc', width: '100%' }}>
      <Box sx={{ display: 'flex' , justifyContent: 'space-between' }}>
        <Typography>{ticket.violation}</Typography>
        <Box sx={{ display: 'flex' , flexDirection: 'column',  justifyContent: 'space-between' }}>
          <Typography>{handleHourDate(ticket.issue)}</Typography>
          <Typography>${ticket.cost}</Typography>
        </Box>
      </Box>
    </Card>
    </ListItemButton>
  );
}

