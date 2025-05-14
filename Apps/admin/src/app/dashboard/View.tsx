import UnpaidList from './UnpaidList'
import SideBarNav from './SideBarNav'
import {
  Box,
} from'@mui/material'
export default function DashBoardView() {
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
          // display:'flex',
          // flexDirection:'column',
          // alignItems:'center',
        }}
      >
        <UnpaidList />
      </Box>
    </Box>
  )
}