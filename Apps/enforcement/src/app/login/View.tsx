'use client'

import React from 'react'
import { useState,ChangeEvent } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Container, 
  Typography, 
  Box, 
  Button, 
  TextField
} from '@mui/material'
import { login } from './action'
import logo from '../../public/no-circle-logo.svg'

export default function LoginView() {
  const [credentials, setCredentials] = useState({email: '', password: ''})
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
      window.sessionStorage.setItem('name', authenticated.name)
      router.push('/')
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
        <Typography variant="h4" color = "#008343" sx={{fontSize:'24px'}}><strong>Virtual-Park Enforcement Login</strong></Typography>
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
            placeholder="Email Address"
            onChange={handleInputChange}
            fullWidth
            required
            sx={{width:'300px', color: '#008343'}}
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
            sx={{width:'300px', color: '#008343'}}
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
            sx={{width:'300px', backgroundColor: '#008343'}}
          >
            Sign in
          </Button>
        </Box>
      </Box>
    </Container>
  )
}
