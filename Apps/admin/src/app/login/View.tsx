'use client'

import { useState, ChangeEvent } from 'react'
import { useRouter } from 'next/navigation'
import { 
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
      setFailedLogin(false);
      window.sessionStorage.setItem('name', authenticated.name)
      router.push('/')
    } else {
      setFailedLogin(true);
    }
  }

  return (
    <Box
      sx={{
        mt: 20,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {failedLogin &&
            <Alert severity="error">Incorrect login credentials, please try again</Alert>}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 4,
        }}
      >
        <Typography variant="h3">
          {'Virtual-Park Admin Login'}
        </Typography>
        
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
            placeholder="Email Address"
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
            placeholder="Password"
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
            Sign in
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
