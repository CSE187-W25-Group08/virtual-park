
import { Card, Typography} from '@mui/material';
import Box from '@mui/material/Box';
import { Ticket } from '../../ticket';
import ListItemButton from '@mui/material/ListItemButton';

export default function TicketCard({ticket} : {ticket: Ticket}) {
  const handleHourDate = (dateArg: string) => {
  const dateReceived = new Date(dateArg);

  const month = dateReceived.getMonth() + 1;
  const day = dateReceived.getDate();
  const year = dateReceived.getFullYear();

  return `${month}/${day}/${year}`;
  };


  return (
    <ListItemButton>
    <Card sx={{ p: 2, border: '1px solid #ccc', width: '100%' }}>
      <Box sx={{ display: 'flex' , justifyContent: 'space-between' }}>
        <Typography>{ticket.description}</Typography>
        <Typography>{handleHourDate(ticket.issue)}</Typography>
      </Box>
    </Card>
    </ListItemButton>
  );
}