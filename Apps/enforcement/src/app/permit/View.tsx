'use client'

import React from 'react'
import { useState, ChangeEvent } from 'react'
import { 
  Container, 
  Typography, 
  Box, 
  Button, 
  TextField,
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableRow,
  Paper,
  TableBody,
  Alert
} from '@mui/material'
import { getpermitByPlateNum } from './action'
import { Permit } from '../../permit/index'
import TicketView from '../ticket/View'

export default function PermitView() {
  const [carPlate, setCarPlate] = useState('')
  const [permits, setPermits] = useState<Permit[]>([])
  const [error, setError] = useState<string | null>(null)
  const [ticketSuccess, setTicketSuccess] = useState<string | null>(null)
  const [ticketDialog, setTicketDialog] = useState(false)
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString()
  }
  
  const handleCarPlateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCarPlate(event.target.value)
  }
  
  const handleSearch = async () => {
    if (!carPlate) {
      setError('Please enter a car plate number')
      return
    }
    setError(null)
    setTicketSuccess(null)
    const permitInfo = await getpermitByPlateNum(carPlate)
    setPermits(permitInfo)
    if (permitInfo.length === 0) {
      setError('No permits found for this vehicle')
    }
  }
  
  const ticketDialogHandler = () => {
    if (permits.length > 0) {
      setTicketDialog(true)
    }
  }
  
  const handleTicketSuccess = (ticketId: string) => {
    setTicketDialog(false)
    setTicketSuccess(`Ticket ${ticketId} issued successfully`)
  }
  
  const handleTicketError = (errorMessage: string) => {
    setError(errorMessage)
  }
  
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 3 }}>
        Vehicle Permit
      </Typography>
      
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'flex-start' }}>
        <TextField
          variant="outlined"
          value={carPlate}
          onChange={handleCarPlateChange}
          placeholder="Enter car plate number"
          fullWidth
          sx={{ mr: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          sx={{height: 50}}
        >
          {'Search'}
        </Button>
      </Box>
      
      {ticketSuccess && (
        <Alert severity="success" sx={{mb: 3}}>
          {ticketSuccess}
        </Alert>
      )}
      
      {error && (
        <Alert severity="error" sx={{mb: 3}}>
          {error}
        </Alert>
      )}
      {/* reference: https://mui.com/material-ui/react-table/ */}
      {permits.length > 0 && (
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">
              Permits for {carPlate}
            </Typography>
            <Button
              variant="contained"
              color="error"
              onClick={ticketDialogHandler}
            >
              Issue Ticket
            </Button>
          </Box>
          
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow sx={{backgroundColor: 'primary.main'}}>
                  <TableCell sx={{color:'white'}}>Permit ID</TableCell>
                  <TableCell sx={{color:'white'}}>Type</TableCell>
                  <TableCell sx={{color:'white'}}>Issue Date</TableCell>
                  <TableCell sx={{color:'white'}}>Expiry Date</TableCell>
                  <TableCell sx={{color:'white'}}>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {permits.map((permit) => (
                  <TableRow 
                    key={permit.permitID}
                    sx={{ 
                      backgroundColor: permit.isValid ? 'white' : '#f44336'
                    }}
                  >
                    <TableCell>{permit.permitID}</TableCell>
                    <TableCell>{permit.permitType}</TableCell>
                    <TableCell>{formatDate(permit.issueDate)}</TableCell>
                    <TableCell>{formatDate(permit.expDate)}</TableCell>
                    <TableCell>
                      <Box  
                        sx={{ 
                          backgroundColor: permit.isValid ? 'light-green' : 'light-red',
                          color: permit.isValid ? 'green' : 'black',
                        }}
                      >
                        {permit.isValid ? 'Valid' : 'Expired'}
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
      
      {permits.length > 0 && (
        <TicketView
          open={ticketDialog}
          close={() => setTicketDialog(false)}
          driverID={permits[0].driverID}
          vehicleID={permits[0].vehicleID}
          success={handleTicketSuccess}
          error={handleTicketError}
        />
      )}
    </Container>
  )
}