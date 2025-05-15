import SideBarNav from '../../dashboard/SideBarNav'
import TicketInfo from './TicketInfo'
import {
  Box,
} from'@mui/material'
export default function TicketView({ ticketId }: { ticketId: string }) {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Box sx={{ flexShrink: 0 }}>
        <SideBarNav />
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          flexBasis: '80%',
          p: 7,
          overflow: 'auto',
        }}
      >
        <TicketInfo ticketId={ticketId} />
      </Box>
    </Box>
  )
}