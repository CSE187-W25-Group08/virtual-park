import { useState, ChangeEvent } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'

import { NewEnforcement } from '../../enforcement'

interface CreationModalProps {
  open: boolean
  onClose: () => void
  onSubmit: (details: NewEnforcement) => void
}

export default function CreationModal({ open, onClose, onSubmit }: CreationModalProps) {
  const [name, setName] = useState('')
  const [enforcementId, setEnforcementId] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  
  const isFormValid = () => {
    return (
      name.trim() !== '' &&
      enforcementId.trim() !== '' &&
      email.trim() !== '' &&
      isEmailFormatted(email) &&
      password.trim() !== '' &&
      confirmPassword.trim() !== '' &&
      password === confirmPassword
    )
  }

  const isEmailFormatted = (email: string) => {
    const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
    return regex.test(email)
  }

  const handleSubmit = () => {
    if (!isFormValid()) {
      alert('Please fill in all fields and make sure passwords match.')
      return
    }
    onSubmit({name, enforcementId, email, password})
    setName('')
    setEnforcementId('')
    setEmail('')
    setPassword('')
    setConfirmPassword('')
    onClose()
  }

  const handleClose = () => {
    setName('')
    setEnforcementId('')
    setEmail('')
    setPassword('')
    setConfirmPassword('')
    onClose()
  }

  const handleClear = () => {
    setName('')
    setEnforcementId('')
    setEmail('')
    setPassword('')
    setConfirmPassword('')
  }

  const handleNameInput = (ev: ChangeEvent<HTMLInputElement>) => {
    setName(ev.target.value)
  }

  const handleEnforcementIdInput = (ev: ChangeEvent<HTMLInputElement>) => {
    setEnforcementId(ev.target.value)
  }

  const handleEmailInput = (ev: ChangeEvent<HTMLInputElement>) => {
    setEmail(ev.target.value)
  }

  const handlePasswordInput = (ev: ChangeEvent<HTMLInputElement>) => {
    setPassword(ev.target.value)
  }

  const handleConfirmPasswordInput = (ev: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(ev.target.value)
  }
  
  return (
    <Modal open={open} onClose={handleClose}>
      <Paper
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '80%', sm: 400 },
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <TextField
          fullWidth
          required
          label="New Officer Name"
          value={name}
          onChange={handleNameInput}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          required
          label="New Officer ID"
          value={enforcementId}
          onChange={handleEnforcementIdInput}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          required
          type="email"
          label="New Officer Email"
          value={email}
          onChange={handleEmailInput}
          error={email !== '' && !isEmailFormatted(email)}
          helperText={
            email !== '' && !isEmailFormatted(email)
              ? 'Invalid email format'
              : ''
          }
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          required
          type="password"
          label="Set Password"
          value={password}
          onChange={handlePasswordInput}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          required
          type="password"
          label="Confirm Password"
          value={confirmPassword}
          onChange={handleConfirmPasswordInput}
          error={confirmPassword !== '' && password !== confirmPassword}
          helperText={
            confirmPassword !== '' && password !== confirmPassword
              ? 'Passwords do not match'
              : ''
          }
          sx={{ mb: 2 }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
          <Button onClick={handleClear}>Clear</Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={!isFormValid()}
          >
            Submit
          </Button>
        </Box>
      </Paper>
    </Modal>
  )
}
