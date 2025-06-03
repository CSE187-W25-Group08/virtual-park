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
  Alert,
  Divider,
  Link,
  IconButton,
  InputAdornment
} from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import logo from '../..//public/img/no-circle-logo.svg'
import corner from '../..//public/img/corner.png'
import { login, loginWithGoogle } from './action'

export default function LoginView() {
  const [credentials, setCredentials] = useState({email: '', password: ''})
  const [failedLogin, setFailedLogin] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
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

  const handleClick = async (googleCred? : string) => {
    let authenticated;
    if (googleCred) {
      authenticated = await loginWithGoogle(googleCred);
    } else {
      authenticated = await login(credentials)
    }
    if (authenticated) {
      setFailedLogin(false)
      window.sessionStorage.setItem('name', authenticated.name)
      router.push('/dashboard')
    } else {
      setFailedLogin(true)
    }
  }
  
  return (
    <Box sx = {{display: 'flex', flexDirection:'column',   minHeight: '100vh' }}>
    <Container
      maxWidth="xs"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      {failedLogin &&
            <Alert severity="error" sx={{width:'300px'}}>{t('error')}</Alert>}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 4,
        }}
      >
      <Box sx={{display:'flex', flexDirection:'row', mt:5, alignItems: 'center',  gap: 2, width:'300px', mb:0}}>
        <picture  style={{margin: 0, padding: 0, width: '50px', height: '50px'}}>
        <img
          src={logo.src}
          alt="Virtual Park Logo"
          style={{ width: '50px', height: '50px', cursor: 'pointer' }}
          onClick={() => router.push('/')}
        />
        </picture>
        <Typography variant="h5" sx={{fontSize:'28px'}}>{t("title")}</Typography>
      </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mt: '20px',
            mb:0,
          }}
        >
        <GoogleLogin
          width='300px'
          onSuccess={async (credentialResponse) => {
            if (credentialResponse.credential) {
              await handleClick(credentialResponse.credential);
            }
          }}
          onError={() => {
            setFailedLogin(true);
          }}
        />
      </Box>
      <Divider sx={{ width: '300px', marginTop: '20px' }}>
        <Typography>OR</Typography>
      </Divider>

          <TextField
            name="email"
            type="email"
            placeholder={t('email')}
            onChange={handleInputChange}
            fullWidth
            required
            sx={{
              marginTop: '20px',
              width: '300px',
            }}
          />
        
          <TextField
            name="password"
            type={showPassword ? 'text' : 'password'}
            placeholder={t('password')}
            onChange={handleInputChange}
            fullWidth
            required
            sx={{
              marginTop: '20px',
              width: '300px',
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    aria-label='Toggle Password Visibility'
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        
          <Button
            variant="contained"
            onClick={() => handleClick()}
            sx={{
              marginTop: '20px',
              width: '300px',
            }}
          >
            {t('signin')}
          </Button>
          <Typography variant="body1" sx={{
            marginTop: '20px',
          }}>{t("newTo")}<Link href="/signup">{t("signup")}</Link></Typography>
      </Box>
    </Container>

    <Box
  component="img"
  src={corner.src}
  alt="Logo"
  sx={{
    width: 200,
    height: 200,
    alignSelf: 'flex-end',
      mt: 'auto',
      ml: 'auto'
  }}
/>
</Box>
  )
}
