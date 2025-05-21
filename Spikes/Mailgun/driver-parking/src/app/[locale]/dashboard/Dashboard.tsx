"use client"

import React from "react"
import { useState, useEffect, Fragment } from "react"
import { useRouter } from "next/navigation"
import { Typography, Box, Button, Divider } from "@mui/material"
import { useTranslations } from "next-intl"
import Link from "next/link"

import TicketCard from "../ticket/card"
import { Ticket } from "@/ticket"
import { listUnpaid } from "../ticket/actions"
import { Vehicle } from "@/register"
import { getPrimaryVehicle } from "../register/actions"
import { Permit } from "@/permit"
import PermitListCard from "../permit/history/PermitListCard"
import { getActivePermit } from "../dashboard/actions"
import { sendSimpleEmail } from "./actions"

export default function Dashboard() {
  const [name, setName] = useState<string | null>(null)
  const [unpaidTickets, setUnpaidTickets] = useState<Ticket[]>([])
  const [vehicle, setVehicle] = useState<Vehicle>()
  const [activePermit, setActivePermit] = useState<Permit | null>(null)
  const router = useRouter()
  const t = useTranslations("dashboard")

  useEffect(() => {
    setName(window.sessionStorage.getItem('name'))
    const fetchData = async () => {
      const result = await listUnpaid()
      const primaryVehicle = await getPrimaryVehicle()
      const activePermit = await getActivePermit()
      if (result) {
        setUnpaidTickets(result)
      }
      if (primaryVehicle) {
        setVehicle(primaryVehicle)
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

  const sendEmail = async () => {
    await sendSimpleEmail()
  }

  return (
    <Box sx={{mb: 10}}>
      <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2 }}>
        <Typography variant="h4">{t('welcome')}</Typography>
        <Typography variant="h4">{name}</Typography>
        <Typography variant="body1" sx={{ marginTop: 2 }}>
          {t('vehicle')}
        </Typography>
        <Typography variant="body1">
          {vehicle ? (`${vehicle.make} ${vehicle.model} - ${vehicle.color} (${vehicle.licensePlate})`) :
          (
            <>
              {t('noVehicle')} <Link href="/register">{t('registerVehicle')}</Link>
            </>
          )}
        </Typography>
        <Button onClick={sendEmail} variant="contained" sx={{ marginTop: 2 }}>
          Send Email
        </Button>
        <Divider sx={{ width: "100%", marginTop: 4 }}/>
        
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
        <Divider sx={{ width: "100%", marginTop: 4 }}/>
      </Box>
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
          </Box>
        )}
      </Box>
    </Box>
  )
}