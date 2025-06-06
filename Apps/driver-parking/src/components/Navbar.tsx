'use client';

import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  Drawer,
  CssBaseline,
} from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ReceiptIcon from '@mui/icons-material/Receipt';
import HomeIcon from '@mui/icons-material/Home';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import LocaleSwitcher from '../../src/app/languageSwitcher/LocaleSwitcher';
import logo from '../../src/app/public/img/logo-white.svg';
import { logout } from '@/app/[locale]/login/action';
import { useTheme } from '@mui/material';

export default function Navbar() {
  const router = useRouter();
  const t = useTranslations('top_navbar');
  const isMobile = useMediaQuery('(max-width:900px)');
  const theme = useTheme();

  const handleLogout = async () => {
    await logout();
    window.sessionStorage.clear();
    router.push('/');
  };
  // https://chatgpt.com/c/68224fea-167c-8007-b525-2167c07b5496
  return (
    <>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Image width={30} height={30} src={logo.src} alt="virtual park logo" />
              <Typography variant="h6" component="div">
                {t('title')}
              </Typography>
            </Box>
            <LocaleSwitcher />
          </Box>
        </Toolbar>
      </AppBar>

      {!isMobile && (
        <Drawer
          variant="permanent"
          sx={{
            width: 250,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: 250,
              boxSizing: 'border-box',
              top: theme.mixins.toolbar.minHeight || 64,
            },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: 'auto' }}>
            <List>
              <ListItem disablePadding>
                <ListItemButton onClick={() => router.push('/dashboard')}>
                  <ListItemIcon><HomeIcon /></ListItemIcon>
                  <ListItemText primary={t('dashboard')} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={() => router.push('/register')}>
                  <ListItemIcon><DirectionsCarIcon /></ListItemIcon>
                  <ListItemText primary={t('vehicles')} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={() => router.push('/permit/purchase')}>
                  <ListItemIcon><ShoppingCartIcon /></ListItemIcon>
                  <ListItemText primary={t('purchase')} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={() => router.push('/permit/history')}>
                  <ListItemIcon><ReceiptLongIcon /></ListItemIcon>
                  <ListItemText primary={t('permitHistory')} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={() => router.push('/ticket')}>
                  <ListItemIcon><ReceiptIcon /></ListItemIcon>
                  <ListItemText primary={t('tickets')} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={handleLogout}>
                  <ListItemIcon><LogoutRoundedIcon /></ListItemIcon>
                  <ListItemText primary={t('logout')} />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </Drawer>
      )}
    </>
  );
}
