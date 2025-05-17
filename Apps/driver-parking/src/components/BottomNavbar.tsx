'use client'

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import LogoutIcon from '@mui/icons-material/Logout'
import HomeIcon from '@mui/icons-material/Home'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { logout } from '@/app/[locale]/login/action'

export default function BottomNavbar() {
  const router = useRouter()
  const t = useTranslations('navbar')

  const handleLogout = async () => {
    await logout()
    window.sessionStorage.clear()
    router.push('/')
  }

  const goHome = async () => {
    router.push('/dashboard')
  }

  return (
    <AppBar
      sx={{
        position: 'fixed',
        backgroundColor: 'white',
        color: 'black',
        top: 'auto',
        bottom: 0
      }}>
      <Toolbar>
      <IconButton
          edge='start'
          color='inherit'
          aria-label='Home Button'
          onClick={goHome}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <HomeIcon />
          <Typography variant="caption" sx={{ marginTop: '4px' }}>
            {t('home')}
          </Typography>
        </IconButton>
        <IconButton
          edge='end'
          color='inherit'
          aria-label='Logout Button'
          onClick={handleLogout}
          sx={{
            marginLeft: 'auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <LogoutIcon />
          <Typography variant="caption" sx={{ marginTop: '4px' }}>
            {t('logout')}
          </Typography>
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}