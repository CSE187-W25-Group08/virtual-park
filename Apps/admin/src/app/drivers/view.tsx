import DriversList from './DriversList';
import SideBarNav from '../dashboard/SideBarNav'
import {
  Box,
} from'@mui/material'
export default function DriverView() {
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
            <DriversList />
          </Box>
        </Box>
  );
}