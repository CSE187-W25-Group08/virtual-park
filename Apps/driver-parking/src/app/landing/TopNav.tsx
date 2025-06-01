'use client'

import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { logout } from '../[locale]/login/action'
import { useTranslations } from "next-intl";

import logo from '../public/img/transparent-logo.svg'
import MenuIcon from '@mui/icons-material/Menu';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LogoutIcon from '@mui/icons-material/Logout';

export default function TopNav() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const router = useRouter()
  const t = useTranslations('landing')

  useEffect(() => {
    const session = window.sessionStorage.getItem('name')
    setIsAuthenticated(!!session)
  }, [])

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = async () => {
    await logout()
    window.sessionStorage.clear()
    window.location.reload()
  }

  // https://chatgpt.com/c/683b7c89-1ce4-8007-a0ea-ef438cd664e9
  return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: 2,
          py: 1.5,
          borderBottom: '2px solid #ccc',
        }}
      >
        <img
          src={logo.src}
          alt="Virtual Park Logo"
          style={{ width: '15vw', height: '15vw', cursor: 'pointer' }}
          onClick={() => router.push('/')}
        />

        <IconButton
          edge="end"
          color="inherit"
          onClick={handleMenuOpen}
          aria-controls="menu-appbar"
          aria-haspopup="true"
        >
          <MenuIcon />
        </IconButton>

          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            disableScrollLock
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            PaperProps={{
              sx: {
                maxWidth: '90vw',
                width: '200px'
              }
            }}
          >
            {!isAuthenticated && [
              <MenuItem key="login" onClick={() => { router.push('/login'); handleMenuClose(); }}>
                <ListItemIcon>
                  <LoginIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>{t('login')}</ListItemText>
              </MenuItem>,
              <MenuItem key="signup" onClick={() => { router.push('/signup'); handleMenuClose(); }}>
                <ListItemIcon>
                  <PersonAddIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>{t('signup')}</ListItemText>
              </MenuItem>
            ]}
            {isAuthenticated && (
              <MenuItem onClick={() => { handleLogout(); handleMenuClose(); }}>
                <ListItemIcon>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>{t('logout')}</ListItemText>
              </MenuItem>
            )}
        </Menu>
      </Box>
  )
}
