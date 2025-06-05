'use client'; // [REQUIRED for interactivity]

import { useState } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Drawer,
    Box,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    useMediaQuery
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import LocaleSwitcher from '../../src/app/languageSwitcher/LocaleSwitcher'
import logo from '../../src/app/public/img/logo-white.svg'
import {logout} from '@/app/[locale]/login/action';


export default function Navbar() {
    const [open, setOpen] = useState(false);
    const toggleDrawer = () => setOpen(!open);
    const isMobile = useMediaQuery('(max-width:600px)');
    const router = useRouter();
    const t = useTranslations('top_navbar');

    const handleLogout = async () => {
      await logout();
      window.sessionStorage.clear();
      router.push('/');
    };

  return (
    <>
      <AppBar >
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
            
            {/* Left Side: Logo and Title */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {!isMobile && (
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  onClick={toggleDrawer}
                  sx={{ mr: 1 }}
                >
                  <MenuIcon />
                </IconButton>
              )}
              <Image width={30} height={30} src={logo.src} alt="virtual park logo" />
              <Typography variant="h6" component="div">
                {t('title')}
              </Typography>
            </Box>

            {/* Right Side: Locale Switcher */}
            <LocaleSwitcher />
          </Box>
        </Toolbar>
      </AppBar>


      <Drawer anchor="left" open={open} onClose={toggleDrawer}>
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer}>
          <List>
            <ListItem>
              <ListItemButton onClick={() => router.push('/dashboard')}>
                <ListItemText primary={t('dashboard')} />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton onClick={() => router.push('/register')}>
                <ListItemText primary={t('vehicles')} />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton onClick={() => router.push('/permit/purchase')}>
                <ListItemText primary={t('purchase')} />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton onClick={() => router.push('/permit/history')}>
                <ListItemText primary={t('permitHistory')} />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton onClick={() => router.push('/ticket')}>
                <ListItemText primary={t('tickets')} />
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