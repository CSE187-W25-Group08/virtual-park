'use client'

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import ReceiptIcon from '@mui/icons-material/Receipt'
import HomeIcon from '@mui/icons-material/Home'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

import BottomMenu from './BottomMenu'

export default function BottomNavbar() {
  const router = useRouter()
  const t = useTranslations('navbar')

  return (
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
          edge='start'
          color='inherit'
          aria-label='Home Button'
          onClick={() => router.push('/dashboard')}
          sx={{
            flexDirection: 'column',
            alignItems: 'center',
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
}