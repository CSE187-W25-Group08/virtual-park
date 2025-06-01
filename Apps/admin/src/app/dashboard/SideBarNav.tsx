'use client'
import {
  // Typography, 
  Box,
  Drawer,
  Stack,
  Avatar,
  Divider,
  IconButton
} from'@mui/material'
import NavList from './NavList'
import LogoutIcon from '@mui/icons-material/Logout';
import { logout } from '../login/action'
import { useRouter } from 'next/navigation';

export default function SideBarNav() {
  const router = useRouter();
  const handleLogout = async () => {
    await logout();
    router.push('/login');
  }
  const drawerWidth = 300;
  // https://chatgpt.com/c/68224fea-167c-8007-b525-2167c07b5496
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      {/* Top Content */}
      <NavList />

      <Divider />
      {/* Spacer pushes user card to bottom */}
      <Box sx={{ flexGrow: 1 }} />
      {typeof window !== 'undefined' && (
      <Stack
        direction="row"
        sx={{
          p: 2,
          gap: 1,
          alignItems: 'center',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Avatar
          sizes="small"
          alt={'Admin User'}
          src="/static/images/avatar/7.jpg"
          sx={{ width: 36, height: 36 }}
        />
        <Box sx={{ mr: 'auto' }}>
          {/* <Typography variant="body2" sx={{ fontWeight: 500, lineHeight: '16px' }}>
            {window.sessionStorage.getItem('name')}
          </Typography> */}
        </Box>
        <IconButton aria-hidden="false" aria-label="logout" onClick={() => handleLogout()}>
          <LogoutIcon />
        </IconButton>
      </Stack>
      )}
    </Drawer>
  );
}