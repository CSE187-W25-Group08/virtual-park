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
import logo from '../../app/public/no-circle-logo.svg'
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
        <Box sx={{display:'flex', flexDirection:'row', mt:5, alignItems: 'center',  gap: 2, width:'500px', mb:0}}>
          <picture  style={{margin: 0, padding: 0, width: '50px', height: '50px'}}>
          <img
            src={logo.src}
            alt="Virtual Park Logo"
            style={{ width: '50px', height: '50px', cursor: 'pointer' }}
            onClick={() => router.push('/')}
          />
          </picture>
          <Typography variant="h4" color = "#008343" sx={{fontSize:'35px'}}><strong>Virtual-Park Admin Login</strong></Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mt: 3,
            width:'500px'
          }}
        >
          <TextField
            name="email"
            type="email"
            placeholder="Email Address"
            onChange={handleInputChange}
            fullWidth
            required
            sx={{color:'#008343'}}
          />
        </Box>
        
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mt: 3,
            width:'500px'
          }}
        >
          <TextField
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleInputChange}
            fullWidth
            required
            sx={{color:'#008343'}}
          />
        </Box>
        
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mt: 3,
            width:'500px'
          }}
        >
          <Button
            variant="contained"
            onClick={handleClick}
            sx={{width:'500px', backgroundColor:'#008343'}}
          >
            Sign in
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
