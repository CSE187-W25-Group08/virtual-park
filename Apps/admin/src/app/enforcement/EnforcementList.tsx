'use client'
import * as React from 'react'
import { useState, ChangeEvent } from 'react'
import { DataGrid, GridColDef, GridFooter } from '@mui/x-data-grid'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'

const testData = [
  {
    id: 1,
    name: 'Officer 1',
    email: 'officer1@taps.ucsc',
    hired: '2020-06-15T12:00:00+00:00',
  },
  {
    id: 2,
    name: 'Officer 2',
    email: 'officer2@taps.ucsc',
    hired: '2020-06-15T12:00:00+00:00',
  },
]

export default function EnforcementList() {
  const [modalOpen, setModalOpen] = useState(false)
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
    alert(`Officer Name: ${name}, Officer ID: ${enforcementId}, Officer Email: ${email}, Password: ${password}`)
    setModalOpen(false)
    setName('')
    setEnforcementId('')
    setEmail('')
    setPassword('')
    setConfirmPassword('')
  }

  const handleAddClick = () => {
    setModalOpen(true)
  }

  const handleClose = () => {
    setModalOpen(false)
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

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Officer Name',
      width: 200,
      flex: 1,
      renderCell: (params) => (
        <Tooltip title={params.value}>
          <Typography noWrap sx={{ maxWidth: 230 }}>
            {params.value}
          </Typography>
        </Tooltip>
      ),
    },
    {
      field: 'id',
      headerName: 'Enforcment ID',
      width: 200,
      flex: 1,
      renderCell: (params) => (
        <Tooltip title={params.value}>
          <Typography noWrap sx={{ maxWidth: 230 }}>
            {params.value}
          </Typography>
        </Tooltip>
      ),
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 250,
      flex: 1,
      renderCell: (params) => (
        <Tooltip title={params.value}>
          <Typography noWrap sx={{ maxWidth: 230 }}>
            {params.value}
          </Typography>
        </Tooltip>
      ),
    },
    {
      field: 'hired',
      headerName: 'Date Hired',
      width: 200,
      flex: 1,
      renderCell: (params) => {
        const date = new Date(params.value)
        return date.toLocaleString() || 'Invalid date'
      },
    },
  ]
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Enforcement Officers
      </Typography>
      {testData && testData.length != 0 ? (
        <DataGrid
          rows={testData}
          columns={columns}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          pageSizeOptions={[10, 20, 50]}
          density="compact"
          disableColumnResize
          getRowId={(row) => row.id || Math.random().toString()}
          getRowClassName={(params) =>
            params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
          }
          slots={{
            footer: () => (
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Box
                  onClick={handleAddClick}
                  sx={{
                    p: 1,
                    backgroundColor: '#f5f5f5',
                    border: '1px solid #e0e0e0',
                    borderRadius: 1,
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: '#eeeeee',
                    },
                  }}
                >
                  <Typography sx={{ color: '#757575' }}>
                    + Add new enforcement officer
                  </Typography>
                </Box>
                <GridFooter />
              </Box>
            ),
          }}
          sx={{
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#f5f5f5',
            },
            '& .MuiDataGrid-row.even': {
              backgroundColor: '#fafafa',
            },
            '& .MuiDataGrid-row.odd': {
              backgroundColor: '#ffffff',
            },
            '& .MuiDataGrid-row:hover': {
              backgroundColor: '#e6f7ff',
            },
          }}
          loading={testData.length === 0}
        />
      ) : (
        <Typography>No Active Enforcement Officers</Typography>
      )}

      <Modal open={modalOpen} onClose={handleClose}>
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
            label="Officer Name"
            value={name}
            onChange={handleNameInput}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            required
            label="Officer ID"
            value={enforcementId}
            onChange={handleEnforcementIdInput}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            required
            type="email"
            label="Officer Email"
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
            label="Password"
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
    </Box>
  )
}
