"use client"

import React from "react"
import { useState, useEffect, Fragment } from "react"
import { Typography, Box, Button, Divider } from "@mui/material"

import TicketCard from "../ticket/card"
import { Ticket } from "@/ticket"
import { listUnpaid } from "../ticket/actions"
import { Vehicle } from "@/register"
import { getUserVehicles } from "../register/actions"
import { Permit } from "@/permit"
import PermitListCard from "../permit/history/PermitListCard"

export default function Dashboard() {
  const [name, setName] = useState<string | null>(null)
  const [unpaidTickets, setUnpaidTickets] = useState<Ticket[]>([])
  const [vehicle, setVehicle] = useState<Vehicle>()
  const [activePermit, setActivePermit] = useState<Permit | null>({
    issueDate: "2024-09-21T08:00:00.000Z",
    expDate: "2025-06-14T08:00:00.000Z",
    type: "Student",
    price: 3.14
  })

  useEffect(() => {
    setName(window.sessionStorage.getItem('name'))
    const fetchData = async () => {
      const result = await listUnpaid()
      const vehicles = await getUserVehicles()
      if (result) {
        setUnpaidTickets(result)
      }
      if (vehicles) {
        setVehicle(vehicles[0])
      }
    }
    fetchData()
  }, [])

  const buyPermit = () => {
    alert("You have bought a permit.")
  }

  const payTickets = () => {
    alert(`All tickets paid.\nTotal: $${unpaidTickets.reduce((acc, ticket) => acc + ticket.cost, 0)}`)
  }

  return (
    <Fragment>
      <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 2 }}>
        <Typography variant="h4">Welcome back,</Typography>
        <Typography variant="h4">{name}.</Typography>
        <Typography variant="body1" sx={{ marginTop: 2 }}>
          Active Vehicle:
        </Typography>
        <Typography variant="body1">
          {vehicle ? `${vehicle.make} ${vehicle.model} - ${vehicle.color} (${vehicle.licensePlate})` : "No active vehicle."}
        </Typography>
        <Divider sx={{ width: "100%", marginTop: 4 }}/>
        
      </Box>
      <Box sx={{display: 'flex', flexDirection: 'column', marginTop: 2 }}>
        <Typography variant="h4" sx={{ marginLeft: 1}}>
          Active Permit
        </Typography>
        {activePermit && (
          <PermitListCard permit={activePermit} />
        )}
        {activePermit === null && (
          <Typography variant="h6" sx={{ marginLeft: 1 }}>
            You have no active permit.
          </Typography>
        )}
        <Button
          variant="contained"
          sx={{ marginTop: 4 }}
          onClick={buyPermit}
        >
          Buy Permit
        </Button>
        <Divider sx={{ width: "100%", marginTop: 4 }}/>
      </Box>
      <Box sx={{display: 'flex', flexDirection: 'column', marginTop: 2 }}>
        <Typography variant="h4" sx={{ marginLeft: 1}}>
          Tickets
        </Typography>
        {unpaidTickets.length === 0 && (
          <Typography variant="h6" sx={{ marginLeft: 1 }}>
            You have no unpaid tickets.
          </Typography>
        )}
        {unpaidTickets.length > 0 && (
          <Box sx={{ display: "flex", flexDirection: "column", marginTop: 2 }}>
            <Typography variant="body1" color="error" sx={{ marginLeft: 1, marginBottom: 2 }}>
              You have {unpaidTickets.length} unpaid tickets.
            </Typography>
            {unpaidTickets.map((ticket, index) => (
              <TicketCard key={index} ticket={ticket} />
            ))}
            <Button
              variant="contained"
              sx={{ marginTop: 2, marginLeft: 1 }}
              onClick={payTickets}>
              Pay Tickets
            </Button>
          </Box>
        )}
      </Box>
    </Fragment>
  )
}