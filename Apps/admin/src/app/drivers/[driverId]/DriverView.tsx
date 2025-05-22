import DriverInfo from "./DriverInfo";
import SideBarNav from '../../dashboard/SideBarNav'
import {
  Box,
} from'@mui/material'
export default function DriverDetailsView({ driverId }: { driverId: string }) {
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
        <DriverInfo driverId={driverId} />
      </Box>
    </Box>
  )
}