'use client'

import React from 'react'
import { useState, ChangeEvent } from 'react'
import { 
  Container, 
  Typography, 
  Box, 
  Button, 
  TextField,
  Alert,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent
} from '@mui/material'
import { getpermitByPlateNum, googleVision, getDriverFromVehiclePlate, UnregisteredVehicle, getallLots} from './action'
import { Permit } from '../../permit/index'
import { Lot } from '../../lot/index'
import TicketView from '../ticket/View'

export default function PermitView() {
  const [carPlate, setCarPlate] = useState('')
  const [currentLot, setCurrentLot] = useState('')
  const [lotOptions, setLotOptions] = useState<Lot[]>([])
  const [permits, setPermits] = useState<Permit[]>([])
  const [validPermit, setValidPermit] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [ticketSuccess, setTicketSuccess] = useState<string | null>(null)
  const [ticketDialog, setTicketDialog] = useState(false)
  const [driverID, setDriverID] = useState('')
  const [loading, setLoading] = useState(false)
  const [vehicleID, setVehicleID] = useState('')
  

  React.useEffect(() => {
    loadLots()
  }, [])

  const loadLots = async () => {
    const lots = await getallLots()
    setLotOptions(lots)
  }
  
  const handleCarPlateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCarPlate(event.target.value)
  }

  const handleLotChange = (event: SelectChangeEvent<string>) => {
    setCurrentLot(event.target.value)
    resetSearch()
  }

  const resetSearch = () => {
    setPermits([])
    setError(null)
    setTicketSuccess(null)
    setDriverID('')
    setValidPermit('')
    setVehicleID('')
  }
  
  const getCurrentLotInfo = () => {
    return lotOptions.find(lot => lot.id === currentLot)
  }
  const handleSearch = async (plateInput?: string) => {
    const plateToUse = plateInput || carPlate;
    if (!plateToUse) {
      setError('Please enter a car plate number');
      return;
    }
    setError(null);
    setTicketSuccess(null);
    setVehicleID('');
    
    try {
      const permitInfo = await getpermitByPlateNum(plateToUse);
      const validPermits = permitInfo.filter(permit => permit.permitID != null);
      
      setPermits(validPermits);
      
      if (validPermits.length === 0) {
        setValidPermit('');
        setError('No permits found for this vehicle');
        const driverID = await getDriverFromVehiclePlate(plateToUse);
        if (driverID) {
          setDriverID(String(driverID));
        } else {
          setDriverID('');
        }
      } else {
        const currentLotInfo = getCurrentLotInfo()
        const validPermit = validPermits.filter(permit => permit.isValid);
        
        if ( validPermit.length === 0) {
          setError('Expired permit found for this vehicle');
          setDriverID(String(validPermits[0].driverID));
          setVehicleID(String(validPermits[0].vehicleID));
        } else {
          /* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some */
          const permitValidForLot =  validPermit.some(permit => 
            currentLotInfo?.validPermits.includes(permit.permitClass)
          );
          
          if (permitValidForLot) {
            setValidPermit(`Valid permit found for vehicle ${plateToUse} in ${currentLotInfo?.name}`);
          } else {
            const permitClasses = validPermit.map(p => p.permitClass).join(', ');
            const allowedTypes = currentLotInfo?.validPermits.join(', ');
            setError(`Vehicle has ${permitClasses} permit(s), valid permits for ${currentLotInfo?.name}: ${allowedTypes}`);
          }
          
          setDriverID(String(validPermit[0].driverID));
          setVehicleID(String(validPermit[0].vehicleID));
        }
      }
    } catch (err) {
      console.error("Error during permit search:", err);
      setPermits([]);
      setDriverID('');
      setVehicleID('');
      setError('Error searching for permits');
    }
  };

  const ticketDialogHandler = async () => {
    if (permits.length === 0) {
       const unregisterVeh = await UnregisteredVehicle(carPlate);
       setVehicleID(unregisterVeh.id);
    }
    setTicketDialog(true)
  }
  
  const handleTicketSuccess = () => {
    setTicketDialog(false)
    setError(null)
    setTicketSuccess(`Ticket issued successfully`)
  }

  const handleTicketError = (errorMessage: string) => {
    setTicketDialog(false)
    setError(errorMessage)
  }

  const clearScreen = () => {
    setCarPlate('')
    setCurrentLot('')
    resetSearch()
  }

  const handleOCR = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) {
      return
    }

    resetSearch()
    setLoading(true)

    const base64 = await toBase64(file)
    const plate = await googleVision(base64)

    setLoading(false)

    if (!plate) {
      setError('Failed to recognize license plate')
    } else {
      setCarPlate(plate)
      handleSearch(plate)
    }
  }

  const toBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        const result = reader.result as string
        const base64 = result.split(',')[1]
        resolve(base64)
      }
      reader.onerror = reject
    })
  }

  const permitViolation = error && (
    error.includes('No permits found') || 
    error.includes('Expired permit') || 
    error.includes('valid permits for Lot')
  )
  
  return (
    <Container maxWidth="md" sx={{py: 4}}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 3 }}>
        Vehicle Permit
      </Typography>

      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel id="currentLot-label">Current Parking Lot</InputLabel>
        <Select
          labelId="currentLot-label"
          value={currentLot}
          onChange={handleLotChange}
          label="Current Parking Lot"
          required
        >
          {lotOptions.map(lot => (
            <MenuItem key={lot.id} value={lot.id}>
              {lot.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      
      <Box sx={{mb: 4, display: 'flex', alignItems: 'flex-start'}}>
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
          onClick={() => handleSearch()}
          sx={{height: 56}}
          disabled={!currentLot}
        >
          Search
        </Button>
      </Box>

      <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
        <input
          type="file"
          accept="image/*"
          id="upload-photo"
          hidden
          onChange={handleOCR}
        />
        <label htmlFor="upload-photo">
          <Button variant="outlined" component="span" sx={{height: 50}} disabled={!currentLot}>
            Upload Image
          </Button>
        </label>
        <Button variant="outlined" sx={{height: 50}} onClick={clearScreen}>
          Clear
        </Button>
      </Box>

      {ticketSuccess && (
        <Alert severity="success" sx={{mb: 3}}>
          {ticketSuccess}
        </Alert>
      )}
      
      {validPermit && (
        <Alert severity="success" sx={{mb: 3}}>
          {validPermit}
        </Alert>
      )}
      
      {error && (
        <Alert severity="error" sx={{mb: 3}}>
          {error}
        </Alert>
      )}

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
          <CircularProgress />
        </Box>
      )}

      {permitViolation && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Button
            variant="contained"
            color="error"
            onClick={ticketDialogHandler}
          >
            Issue Ticket
          </Button>
        </Box>
      )}

      {ticketDialog && (
        <TicketView
          open={ticketDialog}
          close={() => setTicketDialog(false)}
          driverID={driverID}
          vehicleID={vehicleID}
          success={handleTicketSuccess}
          error={handleTicketError}
          LotName ={getCurrentLotInfo()?.name || ''}
          ticketPrice={getCurrentLotInfo()?.ticketPrice || 0}
        />
      )}
    </Container>
  )
}