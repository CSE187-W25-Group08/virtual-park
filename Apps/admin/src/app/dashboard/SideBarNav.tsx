"use client"
import {
  Typography, 
  Box,
  Drawer,
  Stack,
  Avatar,
  Divider,
} from'@mui/material'
import NavList from './NavList'
export default function SideBarNav() {
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
      <Box sx={{ p: 3 }}>
        <Typography variant="h5">Dashboard &gt; Home</Typography>
      </Box>

      <Divider />

      <NavList />

      <Divider />
      {/* Spacer pushes user card to bottom */}
      <Box sx={{ flexGrow: 1 }} />

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
          alt={window.sessionStorage.getItem('name') ?? 'Admin User'}
          src="/static/images/avatar/7.jpg"
          sx={{ width: 36, height: 36 }}
        />
        <Box sx={{ mr: 'auto' }}>
          <Typography variant="body2" sx={{ fontWeight: 500, lineHeight: '16px' }}>
            {window.sessionStorage.getItem('name')}
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            {window.sessionStorage.getItem('email')}
          </Typography>
        </Box>
      </Stack>
    </Drawer>
  );
}