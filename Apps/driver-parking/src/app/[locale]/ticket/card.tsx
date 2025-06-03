
import { Card, Typography} from '@mui/material';
import Box from '@mui/material/Box';
import ListItemButton from '@mui/material/ListItemButton';
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl';

import { Ticket } from "../../../ticket";

export default function TicketCard({ ticket }: { ticket: Ticket }) {
  const router = useRouter();
  const t = useTranslations("ticket");

  const handleHourDate = (dateArg: string) => {
    const dateReceived = new Date(dateArg);

    const month = dateReceived.getMonth() + 1;
    const day = dateReceived.getDate();
    const year = dateReceived.getFullYear();

    return `${month}/${day}/${year}`;
  };

  const handleClick = (ticketId: string) => {
    router.push("ticket/" + ticketId);
  };

  const displayInfo = (ticket: Ticket) => {
    const submitted = ticket.appeal === "submitted"
    const approved =  ticket.appeal === "approved";
    // const rejected =  ticket.appeal === "rejected";
  
    if (approved) {
      return <Typography color="success.dark">{t("accepted")}</Typography>;
    }

    if (submitted) {
      return <Typography color="warning.dark">{t("submitted")}</Typography>;
    }

    return (
      <Typography sx={{}} color='red'>{t('rejected')}</Typography>
    )
  };

  return (
    <ListItemButton 
      onClick={() => {handleClick(ticket.id)}}
      sx={{ width: '100%', p: 0, mb: 2, maxWidth: '1000px' }}
    >
    <Card 
      sx={{ 
        borderRadius: 3,
        boxShadow: 2,

        p: 2,
        border: '1px solid #ccc',
        width: '100%'
      }}
    >

      <Box sx={{ display: 'flex' , flexDirection:'column', gap: 1 }}>
        <Box sx={{ display: 'flex' , justifyContent: 'space-between' }}>
          <Typography
            sx={{
              fontWeight: 'bold',
              fontSize: '105%',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              maxWidth: '62%',
            }}
          >{ticket.violation}</Typography>
          {displayInfo(ticket)}
        </Box>
        <Box sx={{display: 'flex' , flexDirection: 'row',  justifyContent: 'space-between' }}>
          <Box>
            <Typography sx={{}}>Issued: {handleHourDate(ticket.issue)}</Typography>
            <Typography sx={{}}>Due: {handleHourDate(ticket.due)}</Typography>
          </Box>
          <Typography sx={{fontSize:'200%'}}>${ticket.cost}</Typography>
        </Box>
      </Box>
    </Card>
    </ListItemButton>
  );
}
