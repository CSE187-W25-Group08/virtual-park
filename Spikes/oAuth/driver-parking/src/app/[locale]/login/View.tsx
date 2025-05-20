'use client'

import React from 'react'
import { useState,ChangeEvent } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslations } from "next-intl";
import { GoogleLogin } from '@react-oauth/google'
import { 
  Container, 
  Typography, 
  Box, 
  Button, 
  TextField,
  Alert
} from '@mui/material'
import { login } from './action'

export default function LoginView() {
  const [credentials, setCredentials] = useState({email: '', password: ''})
  const [failedLogin, setFailedLogin] = useState(false)
  const t = useTranslations('login')
  const router = useRouter()

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {value, name} = event.currentTarget
    const u = credentials
    if (name == 'email') {
      u.email = value
    } else {
      u.password = value
    }
    setCredentials(u)
  }

  const handleClick = async () => {
    const authenticated = await login(credentials)
    if (authenticated) {
      setFailedLogin(false)
      window.sessionStorage.setItem('name', authenticated.name)
      router.push('/dashboard')
    } else {
      setFailedLogin(true)
    }
  }

  return (
    <Container
      maxWidth="xs"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {failedLogin &&
            <Alert severity="error">{t('error')}</Alert>}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 4,
        }}
      >
        <Typography variant="h5">
          {t('title')}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mt: 2,
          }}
        >
        <GoogleLogin
          onSuccess={async (credentialResponse) => {
            if (!credentialResponse.credential) return;
            const res = await fetch('http://localhost:3010/api/v0/auth/google-login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ token: credentialResponse.credential })
            });

            if (res.ok) {
              const data = await res.json();
              console.log("data", data)
              window.sessionStorage.setItem('name', data.name);
              router.push('/dashboard');
            } else {
              setFailedLogin(true);
            }
          }}
          onError={() => {
            console.log('Google Login Failed');
            setFailedLogin(true);
          }}
        />
      </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mt: 5,
          }}
        >
          <TextField
            name="email"
            type="email"
            placeholder={t('email')}
            onChange={handleInputChange}
            fullWidth
            required
          />
        </Box>
        
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mt: 5,
          }}
        >
          <TextField
            name="password"
            type="password"
            placeholder={t('password')}
            onChange={handleInputChange}
            fullWidth
            required
          />
        </Box>
        
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mt: 5,
          }}
        >
          <Button
            variant="contained"
            onClick={handleClick}
          >
            {t('signin')}
          </Button>
        </Box>
      </Box>
    </Container>
  )
}
