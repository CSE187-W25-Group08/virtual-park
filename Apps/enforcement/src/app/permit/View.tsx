'use client'

import React from 'react'
import { useState,ChangeEvent } from 'react'
// import { useRouter } from 'next/navigation'
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
  Alert,
} from '@mui/material'
import { getpermitByPlateNum } from './action'
import { Permit } from '@/permit'

export default function PermitView() {
  const [carPlate, setCarPlate] = useState('')
  const [permits, setPermits] = useState<Permit[]>([])
  const [error, setError] = useState<string | null>(null)
  

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
    const permitInfo = await getpermitByPlateNum(carPlate)
    setPermits(permitInfo)
    if (permitInfo.length === 0) {
      setError('No permits found for this vehicle')
    }
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
      {/* reference: https://mui.com/material-ui/react-alert/ */}
      {error && (
        <Alert severity="error" sx={{mb: 3}}>
          {error}
        </Alert>
      )}
      {/* https://mui.com/material-ui/react-table/
      https://mui.com/material-ui/customization/palette/ */}
      {permits.length > 0 && (
        <Box>
          <Typography variant="h6" gutterBottom>
            Permits for {carPlate}
          </Typography>
          
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow sx={{backgroundColor: 'primary.main'}}>
                  <TableCell sx={{color: 'white'}}>Permit ID</TableCell>
                  <TableCell sx={{color: 'white'}}>Type</TableCell>
                  <TableCell sx={{color: 'white'}}>Issue Date</TableCell>
                  <TableCell sx={{color: 'white'}}>Expiry Date</TableCell>
                  <TableCell sx={{color: 'white'}}>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {permits.map((permit) => (
                  <TableRow 
                    key={permit.permitID}
                    sx={{ 
                      backgroundColor: permit.isValid ? 'inherit' : '#ffeeee'
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
                          color: permit.isValid ? 'green' : 'red',
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
    </Container>
  )
}
