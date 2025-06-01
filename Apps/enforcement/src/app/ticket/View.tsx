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
import {TicketViewProps, TicketInfo } from '../../ticket/index'
import {issueTicketForCar, getallLots, getDriverDetails, sendEmail} from './action'
import {Lot} from '../../lot/index'


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
  const [lotOptions, setLotOptions] = useState<Lot[]>([])
  
  React.useEffect(() => {
    setTicketInfo(prev => ({
      ...prev,
      driverID,
      vehicleID
    }))
  }, [driverID, vehicleID])

  React.useEffect (() => {
    if (open) {
      loadLots()
    }
  }, [open])

  const loadLots = async () => {
    const lots = await getallLots()
    setLotOptions(lots)
  }
  
  const handleTextInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setTicketInfo({
      ...ticketInfo,
      [name]: value
    });
  };

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    if (name === 'lot') {
      const selectedLot = lotOptions.find(lot => lot.id === value);
      setTicketInfo({
        ...ticketInfo,
        [name]: value,
        cost: selectedLot?.ticketPrice || 0
      });
    }
  };
  
  const handleSubmitTicket = async () => {
    try {
      if (!ticketInfo.lot || !ticketInfo.violation || !ticketInfo.description) {
        error('Please fill in all required fields *')
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
      const driver = await getDriverDetails(ticketInfo.driverID)
      if (driver) {
        await sendEmail(driver.email, driver.name, ticket)
      }
      
      success(ticket.id)
      resetDialog()
      
    } catch (err) {
      console.log(err)
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
  /* reference: https://www.meje.dev/blog/handle-change-in-ts */
  /* reference: https://mui.com/material-ui/api/select/ */
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
            <InputLabel id = 'lotSelection'>Parking Lot</InputLabel>
            <Select
              labelId = 'lotSelection (Required)'
              name="lot"
              value={ticketInfo.lot}
              onChange={handleSelectChange}
            >
              {(lotOptions).map(lot => (
                <MenuItem key={lot.id} value={lot.id} aria-label={lot.name}>{lot.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <TextField
            name="violation"
            label="Violation Type (Required)"
            fullWidth
            required
            value={ticketInfo.violation}
            onChange={handleTextInputChange}
            placeholder="Permit expired?"
          />
          
          <TextField
            name="description"
            label="Description (Required)"
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
            label="Violation Image"
            fullWidth
            value={ticketInfo.image}
            onChange={handleTextInputChange}
            placeholder="violation image"
          />
          
          <TextField
            name="cost"
            label="Fine (Auto-populated)"
            type="number"
            fullWidth
            required
            value={ticketInfo.cost || 0}
            slotProps={{
              input: {
                readOnly: true,
              },
            }}
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