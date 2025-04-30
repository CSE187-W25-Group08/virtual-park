'use client'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

import { useState } from 'react'

export default function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

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
      default:
        break
    }
  }

  const handleClick = async () => {

  }

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'}}>
      <Typography variant="h4" sx={{
        marginTop: '120px',
      }}>Create an Account</Typography>
      <TextField
        required
        name='email'
        label="Email"
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
        label="Name"
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
        label="Password"
        aria-label='Password'
        type='password'
        onChange={handleInputChange}
        sx={{
          marginTop: '20px',
          width: '300px',
        }}
      />
      <Button variant="contained"
        onClick={handleClick}
        aria-label='Sign Up'
        color='primary'
        sx={{
          marginTop: '20px',
          width: '300px',
        }}>Sign Up</Button>
      <Divider sx={{ width: '300px', marginTop: '20px' }}>
        <Typography>OR</Typography>
      </Divider>
      <Typography variant="body1" sx={{
        marginTop: '20px',
      }}>Already have an account? <a href="/">Log In</a></Typography>
    </Box>
  )
}