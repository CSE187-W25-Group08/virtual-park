'use client'

import { useState } from 'react'
import {
  IconButton,
  Menu,
  MenuItem,
  Typography,
  ListItemIcon,
  ListItemText,
  Divider,
  useTheme,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { logout } from '@/app/[locale]/login/action'

export default function BottomMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const router = useRouter()
  const t = useTranslations('bottom_navbar')
  const theme = useTheme()

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = async () => {
    await logout()
    window.sessionStorage.clear()
    router.push('/')
  }

  return (
    <>
      <IconButton
        edge="end"
        color="inherit"
        aria-label="Bottom Menu"
        onClick={handleClick}
        sx={{
          flexDirection: 'column',
          alignItems: 'center',
          color: open ? theme.palette.primary.main : 'inherit',
        }}
      >
        <MenuIcon />
        <Typography variant="caption" sx={{ marginTop: '4px' }}>
          {t('more')}
        </Typography>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            elevation: 4,
            sx: {
              borderRadius: 2,
              minWidth: 200,
              mt: -8,
              mr: -2,
              py: 0.5,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      > 
        <MenuItem
          onClick={() => {
            router.push('/permit/history')
            handleClose()
          }}
          sx={{
            borderRadius: 1,
            mx: 1,
            my: 0.5,
            '&:hover': {
              backgroundColor: 'primary.light',
              color: 'white',
            },
          }}
        >
          <ListItemText>{t('permitHistory')}</ListItemText>
          <ListItemIcon sx={{ minWidth: 0, ml: 2 }}>
            <ReceiptLongIcon fontSize="small" />
          </ListItemIcon>
        </MenuItem>

        <Divider sx={{ my: 1 }} />

        <MenuItem
          onClick={() => {
            handleLogout()
            handleClose()
          }}
          sx={{
            borderRadius: 1,
            mx: 1,
            my: 0.5,
            '&:hover': {
              backgroundColor: 'error.light',
              color: 'white',
            },
          }}
        >
          <ListItemText>{t('logout')}</ListItemText>
          <ListItemIcon sx={{ minWidth: 0, ml: 2 }}>
            <LogoutRoundedIcon fontSize="small" />
          </ListItemIcon>
        </MenuItem>
      </Menu>
    </>
  )
}
