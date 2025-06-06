
import { Card, Fade, Typography} from '@mui/material';
import Box from '@mui/material/Box';
import GavelIcon from '@mui/icons-material/Gavel';
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
    const approved =  ticket.appeal === "approved"
    const rejected =  ticket.appeal === "rejected"

    if (ticket.appeal != 'null') {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <GavelIcon sx={{
            color:
              approved ? "success.dark" :
              submitted ? "warning.dark" :
              rejected ? "error.dark" : 
              "text.primary"
            }}
          />
          <Typography sx={{
            color:
              approved ? "success.dark" :
              submitted ? "warning.dark" :
              rejected ? "error.dark" :
              "text.primary"
            }}
          >
            {
              approved ? t("accepted") :
              submitted ? t("submitted") :
              rejected ? t("rejected"):
              ""
            }
          </Typography>
        </Box>
      );
    }
  };

  return (
                                <Fade in={true} timeout={500}>
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
            <Typography sx={{}}><strong>Issued:</strong> {handleHourDate(ticket.issue)}</Typography>
            <Typography sx={{}}><strong>Due:</strong> {handleHourDate(ticket.due)}</Typography>
          </Box>
          <Typography variant = {"h5"} sx={{mt: 1, color:"primary"}}>${ticket.cost}</Typography>
        </Box>
      </Box>
    </Card>
    </ListItemButton>
</Fade>
  );
}
