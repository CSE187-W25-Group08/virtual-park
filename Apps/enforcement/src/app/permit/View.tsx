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
  CircularProgress
} from '@mui/material'
import { getpermitByPlateNum } from './action'
import { Permit } from '@/permit'

export default function PermitView() {
  const [carPlate, setCarPlate] = useState('')
  const [permits, setPermits] = useState<Permit[]>([])
  const [loading, setLoading] = useState(false)
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
    setLoading(true)
    setError(null)
    
    try {
      const cookie = localStorage.getItem('auth_token') || undefined
      console.log("Using cookie:", cookie)
      const permitData = await getpermitByPlateNum(carPlate)
      setPermits(permitData)
      
      if (permitData.length === 0) {
        setError('No permits found for this vehicle')
      }
    } catch (err) {
      console.log('the error message for fetch permit:', error)
      setError(err instanceof Error ? err.message : 'Failed to fetch permit information')
      setPermits([])
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <p>'permit page'</p>
    // <Container maxWidth="md" sx={{ py: 4 }}>
    //   <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 3 }}>
    //     Vehicle Permit Lookup
    //   </Typography>
      
    //   <Box sx={{ mb: 4, display: 'flex', alignItems: 'flex-start' }}>
    //     <TextField
    //       label="Car Plate Number"
    //       variant="outlined"
    //       value={carPlate}
    //       onChange={handleCarPlateChange}
    //       placeholder="Enter car plate number"
    //       fullWidth
    //       sx={{ mr: 2 }}
    //     />
    //     <Button
    //       variant="contained"
    //       color="primary"
    //       onClick={handleSearch}
    //       disabled={loading}
    //       sx={{ height: 56 }}
    //     >
    //       {loading ? <CircularProgress size={24} color="inherit" /> : 'Search'}
    //     </Button>
    //   </Box>
      
    //   {error && (
    //     <Alert severity="error" sx={{ mb: 3 }}>
    //       {error}
    //     </Alert>
    //   )}
      
    //   {permits.length > 0 && (
    //     <Box>
    //       <Typography variant="h6" gutterBottom>
    //         Permits for {carPlate}
    //       </Typography>
          
    //       <TableContainer component={Paper}>
    //         <Table>
    //           <TableHead>
    //             <TableRow sx={{ backgroundColor: 'primary.main' }}>
    //               <TableCell sx={{ color: 'white' }}>Permit ID</TableCell>
    //               <TableCell sx={{ color: 'white' }}>Type</TableCell>
    //               <TableCell sx={{ color: 'white' }}>Issue Date</TableCell>
    //               <TableCell sx={{ color: 'white' }}>Expiry Date</TableCell>
    //               <TableCell sx={{ color: 'white' }}>Status</TableCell>
    //             </TableRow>
    //           </TableHead>
    //           <TableBody>
    //             {permits.map((permit) => (
    //               <TableRow 
    //                 key={permit.permitID}
    //                 sx={{ 
    //                   backgroundColor: permit.isValid ? 'inherit' : '#ffeeee'
    //                 }}
    //               >
    //                 <TableCell>{permit.permitID}</TableCell>
    //                 <TableCell>{permit.permitType}</TableCell>
    //                 <TableCell>{formatDate(permit.issueDate)}</TableCell>
    //                 <TableCell>{formatDate(permit.expDate)}</TableCell>
    //                 <TableCell>
    //                   <Box 
    //                     component="span" 
    //                     sx={{ 
    //                       py: 0.5, 
    //                       px: 1.5, 
    //                       borderRadius: 1,
    //                       backgroundColor: permit.isValid ? '#e0f7e6' : '#ffe0e0',
    //                       color: permit.isValid ? '#1b5e20' : '#c62828',
    //                       fontWeight: 'medium'
    //                     }}
    //                   >
    //                     {permit.isValid ? 'Valid' : 'Expired'}
    //                   </Box>
    //                 </TableCell>
    //               </TableRow>
    //             ))}
    //           </TableBody>
    //         </Table>
    //       </TableContainer>
    //     </Box>
    //   )}
    // </Container>
  )
}
