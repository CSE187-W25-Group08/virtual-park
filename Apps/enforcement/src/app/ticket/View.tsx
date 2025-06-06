'use client'

import React, { useState, ChangeEvent } from 'react'
import { 
  Button, 
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
} from '@mui/material'
import {TicketViewProps, TicketInfo } from '../../ticket/index'
import {issueTicketForCar, getDriverDetails, sendEmail} from './action'

export default function TicketView({
  open,
  close,
  driverID,
  vehicleID,
  success,
  error,
  LotName,
  ticketPrice,
  LotID
}: TicketViewProps) {
  const [ticketInfo, setTicketInfo] = useState<TicketInfo>({
    driverID: driverID,
    vehicleID: vehicleID,
    lot: LotID,
    description: '',
    violation: '',
    image: '',
    cost: 0
  })

  React.useEffect(() => {
    setTicketInfo(prev => ({
      ...prev,
      driverID,
      vehicleID,
      lot: LotID,
      cost: ticketPrice
    }))
  }, [driverID, vehicleID, LotID, ticketPrice])
  
  const handleTextInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setTicketInfo({
      ...ticketInfo,
      [name]: value
    });
  };
  
  const handleSubmitTicket = async () => {
    try {
      if (!ticketInfo.lot || !ticketInfo.violation || !ticketInfo.description) {
        error('Please fill in all required fields *')
        return
      }
      
      // console.log('Submitting ticket with lot:', ticketInfo.lot)
      const imageUrl = (ticketInfo.image !== null) ? ticketInfo.image : ''
      const ticket = await issueTicketForCar(
        ticketInfo.driverID,
        ticketInfo.vehicleID,
        ticketInfo.lot,
        ticketInfo.description,
        ticketInfo.violation,
        imageUrl,
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
      lot: LotID,
      description: '',
      violation: '',
      image: '',
      cost: ticketPrice,
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
          
          <TextField
            label="Parking Lot"
            fullWidth
            value={LotName}
            slotProps={{
              input: {
                readOnly: true,
              },
            }}
          />
          
          <TextField
            name="violation"
            label="Violation Type (Required)"
            fullWidth
            required
            value={ticketInfo.violation}
            onChange={handleTextInputChange}
            placeholder="No Permit, Wrong Lot, Expired Permit"
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
            label="Violation Image URL"
            fullWidth
            value={ticketInfo.image}
            onChange={handleTextInputChange}
            placeholder="Optional: URL to violation photo"
          />
          
          {/* <TextField
            label="Fine Amount ($)"
            type="number"
            fullWidth
            value={ticketInfo.cost}
            slotProps={{
              input: {
                readOnly: true,
              },
            }}
          /> */}
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