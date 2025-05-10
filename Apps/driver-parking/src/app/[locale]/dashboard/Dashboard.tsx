"use client"

import React from "react"
import { useState, useEffect, Fragment } from "react"
import { Typography, Box, Button, Divider } from "@mui/material"

import TicketCard from "../ticket/card"
import { Ticket } from "@/ticket"
import { listUnpaid } from "../ticket/actions"

export default function Dashboard() {
  const [name, setName] = useState<string | null>(null)
  const [unpaidTickets, setUnpaidTickets] = useState<Ticket[]>([])

  useEffect(() => {
    setName(window.sessionStorage.getItem('name'))
    const fetchData = async () => {
      const result = await listUnpaid()
      if (result) {
        setUnpaidTickets(result)
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
        <Button
          variant="contained"
          sx={{ marginTop: 2 }}
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