'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

import { useRouter } from 'next/navigation'

import logo from '../public/img/virtual-park-logo.png'

export default function Landing() {
  const router = useRouter()

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
          Welcome to Virtual-Park!
      </Typography>
      <Button variant="contained"
        onClick={() => router.push('/login')}
        sx={{
          marginTop: '20px',
          width: '100px'
        }}>
        Login
      </Button>
      <Button variant="contained"
        onClick={() => router.push('/signup')}
        sx={{
          marginTop: '20px',
          width: '100px'
        }}>
        Sign Up
      </Button>
    </Box>
  )
}