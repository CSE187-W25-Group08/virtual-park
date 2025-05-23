"use client"

import React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Typography, Box, Button, Divider } from "@mui/material"
import { useTranslations } from "next-intl"

import TicketCard from "../ticket/card"
import { Ticket } from "@/ticket"
import { listUnpaid } from "../ticket/actions"
import { Permit } from "@/permit"
import PermitListCard from "../permit/history/PermitListCard"
import { getActivePermit } from "../dashboard/actions"

export default function Dashboard() {
  const [unpaidTickets, setUnpaidTickets] = useState<Ticket[]>([])
  const [activePermit, setActivePermit] = useState<Permit | null>(null)
  const router = useRouter()
  const t = useTranslations("dashboard")

  useEffect(() => {
    const fetchData = async () => {
      const result = await listUnpaid()
      const activePermit = await getActivePermit()
      if (result) {
        setUnpaidTickets(result)
      }
      if (activePermit) {
        setActivePermit(activePermit)
      }
    }
    fetchData()
  }, [])

  // const buyPermit = () => {
  //   alert(t('permitBought'))
  // }

  // const payTickets = () => {
  //   alert(`${t('ticketsPaid')}${unpaidTickets.reduce((acc, ticket) => acc + ticket.cost, 0)}`)
  // }

  return (
    <Box sx={{mb: 10}}>
      <Box sx={{display: 'flex', flexDirection: 'column', marginTop: 2 }}>
        <Typography variant="h4" sx={{ marginLeft: 1}}>
          {t('tickets')}
        </Typography>
        {unpaidTickets.length === 0 && (
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography variant="h6" sx={{ marginLeft: 1 }}>
              {t('noTickets')}
            </Typography>
            <Button
              variant="contained"
              sx={{ marginTop: 2, marginLeft: 1 }}
              onClick={() => router.push("/ticket")}>
              {t('manageTickets')}
            </Button>
          </Box>
        )}
        {unpaidTickets.length > 0 && (
          <Box sx={{ display: "flex", flexDirection: "column", marginTop: 2 }}>
            <Typography variant="body1" color="error" sx={{ marginLeft: 1, marginBottom: 2 }}>
              {t('unpaidTickets', { count: unpaidTickets.length })}
            </Typography>
            {unpaidTickets.map((ticket, index) => (
              <TicketCard key={index} ticket={ticket} />
            ))}
            {/* <Button
              variant="contained"
              sx={{ marginTop: 2, marginLeft: 1 }}
              onClick={payTickets}>
              {t('payTickets')}
            </Button> */}
            <Divider sx={{ width: "100%", marginTop: 4 }}/>
          </Box>
        )}
      </Box>
      <Box sx={{display: 'flex', flexDirection: 'column', marginTop: 2 }}>
        <Typography variant="h4" sx={{ marginLeft: 1}}>
          {t('permit')}
        </Typography>
        {activePermit && (
          <PermitListCard permit={activePermit} />
        )}
        {activePermit === null && (
          <Typography variant="h6" sx={{ marginLeft: 1 }}>
            {t('noPermit')}
          </Typography>
        )}
        {/* <Button
          variant="contained"
          sx={{ marginTop: 4 }}
          onClick={buyPermit}
        >
          {t('buyPermit')}
        </Button> */}
      </Box>
    </Box>
  )
}