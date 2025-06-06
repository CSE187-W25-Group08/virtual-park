'use client'

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import ReceiptIcon from '@mui/icons-material/Receipt'
import HomeIcon from '@mui/icons-material/Home'
import Typography from '@mui/material/Typography'
import { useMediaQuery } from '@mui/material'
import { usePathname, useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

import BottomMenu from './BottomMenu'
import { useTheme } from '@mui/material'

export default function BottomNavbar() {
  const router = useRouter()
  const pathname = usePathname()
  const t = useTranslations('bottom_navbar')
  const isMobile = useMediaQuery('(max-width:900px)')
  const theme = useTheme()

  const isActive = (path: string) => {
    return pathname.includes(path)
  }

  return (
    isMobile && (
      <AppBar
        sx={{
          position: 'fixed',
          backgroundColor: 'white',
          color: 'black',
          top: 'auto',
          bottom: 0
        }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <IconButton
            color='inherit'
            edge='start'
            aria-label='Home Button'
            onClick={() => router.push('/dashboard')}
            sx={{
              flexDirection: 'column',
              alignItems: 'center',
              color: isActive('dashboard') ? theme.palette.primary.main : 'inherit',
            }}>
            <HomeIcon />
            <Typography variant="caption" sx={{ marginTop: '4px' }}>
              {t('home')}
            </Typography>
          </IconButton>
          <IconButton
            color='inherit'
            aria-label='Vehicles Button'
            onClick={() => router.push('/register')}
            sx={{
              flexDirection: 'column',
              alignItems: 'center',
              color: isActive('register') ? theme.palette.primary.main : 'inherit',
            }}>
            <DirectionsCarIcon />
            <Typography variant="caption" sx={{ marginTop: '4px' }}>
              {t('vehicles')}
            </Typography>
          </IconButton>
          <IconButton
            color='inherit'
            aria-label='Purchase Button'
            onClick={() => router.push('/permit/purchase')}
            sx={{
              flexDirection: 'column',
              alignItems: 'center',
              color: isActive('permit') ? theme.palette.primary.main : 'permit',
            }}>
            <ShoppingCartIcon />
            <Typography variant="caption" sx={{ marginTop: '4px' }}>
              {t('purchase')}
            </Typography>
          </IconButton>
          <IconButton
            color='inherit'
            aria-label='Ticket Button'
            onClick={() => router.push('/ticket')}
            sx={{
              flexDirection: 'column',
              alignItems: 'center',
              color: isActive('ticket') ? theme.palette.primary.main : 'inherit',
            }}>
            <ReceiptIcon />
            <Typography variant="caption" sx={{ marginTop: '4px' }}>
              {t('tickets')}
            </Typography>
          </IconButton>
          <BottomMenu />
        </Toolbar>
      </AppBar>
    )
  )
}