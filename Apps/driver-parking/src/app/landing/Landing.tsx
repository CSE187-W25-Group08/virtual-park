'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import { logout } from '../[locale]/login/action'
import logo from '../public/img/virtual-park-logo.png'
import { useTranslations } from "next-intl";

export default function Landing() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()
  const t = useTranslations('landing')

  useEffect(() => {
    const session = window.sessionStorage.getItem('name')
    if (session) {
      setIsAuthenticated(true)
    } else {
      setIsAuthenticated(false)
    }
  }, [])

  const handleLogout = async () => {
    await logout()
    window.sessionStorage.clear()
    window.location.reload()
  }

  return (
    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <Box sx={{height: '200px'}}>
        <picture>
          <img
            src={logo.src}
            alt="Virtual Park Logo"
            style={{width: '200px', height: '200px'}}
          />
        </picture>
      </Box>
      <Typography variant="h5">
        {t("welcome")}
      </Typography>
      {isAuthenticated === false && (
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <Button variant="contained"
            onClick={() => router.push('/login')}
            sx={{
              marginTop: '20px',
              width: '100px'
            }}>
            {t('login')}
          </Button>
          <Button variant="contained"
            onClick={() => router.push('/signup')}
            sx={{
              marginTop: '20px',
              width: '100px'
            }}>
            {t('signup')}
          </Button>
        </Box>
      )}
      {isAuthenticated && (
        <Box>
          <Button variant="contained"
            onClick={handleLogout}
            sx={{
              marginTop: '20px',
              width: '100px'
            }}>
            {t('logout')}
          </Button>
        </Box>
      )}
    </Box>
  )
}