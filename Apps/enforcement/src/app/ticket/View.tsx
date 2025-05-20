'use client'

import React, { useState, ChangeEvent } from 'react'
import { SelectChangeEvent } from '@mui/material/Select'
import { 
  Button, 
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Stack,
} from '@mui/material'
import {TicketViewProps, TicketInfo } from '../../permit/index'
import {issueTicketForCar} from './action'


export default function TicketView({
  open,
  close,
  driverID,
  vehicleID,
  success,
  error
}: TicketViewProps) {
  const [ticketInfo, setTicketInfo] = useState<TicketInfo>({
    driverID: driverID,
    vehicleID: vehicleID,
    lot: '',
    description: '',
    violation: '',
    image: '',
    cost: 0
  })
  
  React.useEffect(() => {
    setTicketInfo(prev => ({
      ...prev,
      driverID,
      vehicleID
    }))
  }, [driverID, vehicleID])
  
  const lotOptions = [
    { id: 'lot1', name: 'Area 51 Lot' },
    { id: 'lot2', name: 'Lot 101' }
  ]
  {/* reference: https://www.meje.dev/blog/handle-change-in-ts */}
  const handleTextInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setTicketInfo({
      ...ticketInfo,
      [name]: value
    });
  };
  {/* reference: https://mui.com/material-ui/api/select/ */}
  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    setTicketInfo({
      ...ticketInfo,
      [name as string]: value
    });
  };

  const handleNumberInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setTicketInfo({
      ...ticketInfo,
      [name]: parseFloat(value)
    });
  };
  
  const handleSubmitTicket = async () => {
    try {
      if (!ticketInfo.lot || !ticketInfo.violation || !ticketInfo.description) {
        error('Please fill in all required fields')
        return
      }
      const ticket = await issueTicketForCar(
        ticketInfo.driverID,
        ticketInfo.vehicleID,
        ticketInfo.lot,
        ticketInfo.description,
        ticketInfo.violation,
        ticketInfo.image,
        ticketInfo.cost,
        false
      )
      
      success(ticket.id)
      resetDialog()
      
    } catch (err) {
      error(`Failed to issue ticket`)
    }
  }
  
  const resetDialog = () => {
    setTicketInfo({
      driverID: driverID,
      vehicleID: vehicleID,
      lot: '',
      description: '',
      violation: '',
      image: '',
      cost: 0
    })
    close()
  }
  
  return (
    <Dialog 
      open={open} 
      onClose={resetDialog}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>Issue Parking Ticket</DialogTitle>
      <DialogContent>
        <Stack spacing={3} sx={{ mt: 1 }}>
          <input type="hidden" name="driverID" value={ticketInfo.driverID} />
          <input type="hidden" name="vehicleID" value={ticketInfo.vehicleID} />
          <FormControl fullWidth required>
            <InputLabel id="lot-select-label">Parking Lot</InputLabel>
            <Select
              labelId="lotLabel"
              name="lot"
              value={ticketInfo.lot}
              label="Parking Lot"
              onChange={handleSelectChange}
            >
              {lotOptions.map(lot => (
                <MenuItem key={lot.id} value={lot.id}>{lot.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          
          {/* I should have the permit type api call here */}
          <TextField
            name="violation"
            label="Violation Type"
            fullWidth
            required
            value={ticketInfo.violation}
            onChange={handleTextInputChange}
            placeholder="Permit expired?"
          />
          
          <TextField
            name="description"
            label="Description"
            fullWidth
            required
            multiline
            rows={3}
            value={ticketInfo.description}
            onChange={handleTextInputChange}
            placeholder="Provide details about the violation"
          />
          
          <TextField
            name="image"
            label="ViolationImage"
            fullWidth
            value={ticketInfo.image}
            onChange={handleTextInputChange}
            placeholder="violation image"
          />
          
          <TextField
            name="cost"
            label="Fine"
            type="number"
            fullWidth
            required
            value={ticketInfo.cost || 0}
            onChange={handleNumberInputChange}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={resetDialog}>Cancel</Button>
        <Button 
          variant="contained" 
          color="error" 
          onClick={handleSubmitTicket}
        >
          Issue Ticket
        </Button>
      </DialogActions>
    </Dialog>
  )
}