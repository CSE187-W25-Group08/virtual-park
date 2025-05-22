'use client';

import { useState } from 'react';
import {
    IconButton,
    Drawer,
    Box,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Typography
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { logout } from '@/app/[locale]/login/action';


export default function BottomMenu() {
    const [open, setOpen] = useState(false);
    const toggleDrawer = () => setOpen(!open);
    const router = useRouter();
    const t = useTranslations('bottom_navbar');

    const handleLogout = async () => {
        await logout();
        window.sessionStorage.clear();
        router.push('/');
    };

  return (
    <>
      <IconButton
      edge="end"
      color="inherit"
      aria-label="Bottom Menu"
      onClick={toggleDrawer}
      sx={{
        flexDirection: 'column',
        alignItems: 'center'
      }}
      >
          <MenuIcon />
          <Typography variant="caption" sx={{ marginTop: '4px' }}>
            {t('more')}
          </Typography>
      </IconButton>

      <Drawer anchor="right" open={open} onClose={toggleDrawer}>
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer}>
          <List>
            <ListItem>
              <ListItemButton onClick={() => router.push('/permit/history')}>
                <ListItemText primary={t('permitHistory')} />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton onClick={handleLogout}>
                <ListItemText primary={t('logout')} />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
}