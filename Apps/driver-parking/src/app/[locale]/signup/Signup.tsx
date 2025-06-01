'use client'

import Link from 'next/link'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import InputAdornment from '@mui/material/InputAdornment'
import Alert from '@mui/material/Alert'
import logo from '../..//public/img/no-circle-logo.svg'
import { useTranslations } from "next-intl";
import { GoogleLogin } from '@react-oauth/google'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signup } from './actions'
import { loginWithGoogle } from '../login/action'

export default function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [failedSignup, setFailedSignup] = useState(false)
  const router = useRouter()
  const t = useTranslations('signup')

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {value, name} = event.target
    switch (name) {
      case 'name':
        setName(value)
        break
      case 'email':
        setEmail(value)
        break
      case 'password':
        setPassword(value)
        break
    }
  }

  const handleClick = async (googleCred? : string) => {
    let user;
    if (googleCred) {
      user = await loginWithGoogle(googleCred);
    } else {
      user = await signup({name: name, email: email, password: password})
    }
    if (user) {
      setFailedSignup(false)
      window.sessionStorage.setItem('name', user.name)
      router.push('/dashboard')
    } else {
      setFailedSignup(true)
    }
  }

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'}}>
      {failedSignup &&
        <Alert severity="error" aria-label="sign up error" sx={{width:'300px'}}>{t("emailTaken")}</Alert>}
      <Box sx={{display:'flex', flexDirection:'row', mt:5, alignItems: 'center', justifyContent:'space-between', width:'300px', mb: 0}}>
        <picture style={{margin: 0, padding: 0, width: '50px', height: '50px'}}>
        <img
          src={logo.src}
          alt="Virtual Park Logo"
          style={{ width: '50px', height: '50px', cursor: 'pointer' }}
          onClick={() => router.push('/')}
        />
        </picture>
        <Typography variant="h5" sx={{fontSize:'28px'}}>{t("createAccount")}</Typography>
      </Box>
      <Box sx={{m:'20px', mb:0}}>
        <GoogleLogin
            width='300px'
            onSuccess={async (credentialResponse) => {
              if (credentialResponse.credential) {
                await handleClick(credentialResponse.credential);
              }
            }}
            onError={() => {
              setFailedSignup(true);
            }}
        />
      </Box>
      <Divider sx={{ width: '300px', marginTop: '20px' }}>
        <Typography>OR</Typography>
      </Divider>
      <TextField
        required
        name='email'
        label={t("email")}
        aria-label='Email'
        type='email'
        onChange={handleInputChange}
        sx={{
          marginTop: '20px',
          width: '300px',
        }}
      />
      <TextField
        required
        name='name'
        label={t("name")}
        aria-label='Name'
        type="text"
        onChange={handleInputChange}
        sx={{
          marginTop: '20px',
          width: '300px',
        }}
      />        
      <TextField
        required
        name='password'
        label={t("password")}
        aria-label='Password'
        type={showPassword ? 'text' : 'password'}
        onChange={handleInputChange}
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
      <Button variant="contained"
        onClick={() =>handleClick()}
        aria-label='Sign Up'
        color='primary'
        sx={{
          marginTop: '20px',
          width: '300px',
        }}>{t("signup")}</Button>
      <Typography variant="body1" sx={{
        marginTop: '20px',
      }}>{t("accountExist")}<Link href="/login">{t("login")}</Link></Typography>
    </Box>
  )
}