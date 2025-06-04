"use client"

import React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Typography, Box, Button, Divider } from "@mui/material"
import Modal from '@mui/material/Modal'
import Paper from '@mui/material/Paper'
import { useTranslations } from "next-intl"
import { useMediaQuery } from "@mui/material"
import Link from "next/link"

import TicketCard from "../ticket/card"
import PermitListCard from "../permit/history/PermitListCard"
import { Ticket } from "@/ticket"
import { listUnpaid } from "../ticket/actions"
import { Permit, PermitType } from "@/permit"
import { getActivePermit, getDailyPermitType } from "../dashboard/actions"
import { Vehicle } from '@/register'
import { getPrimaryVehicle } from '../register/actions'
import { createCheckout } from '@/stripe/helper'

export default function Dashboard() {
  const [unpaidTickets, setUnpaidTickets] = useState<Ticket[]>([])
  const [activePermits, setActivePermits] = useState<Permit[]>([])
  const [vehicle, setVehicle] = useState<Vehicle | null>(null)
  const [dailyPermitType, setDailyPermitType] = useState<PermitType | null>(null)
  const [registerModalOpen, setRegisterModalOpen] = useState(false)
  const router = useRouter()
  const t = useTranslations("dashboard")
  const isMobile = useMediaQuery('(max-width:600px)')
  

  useEffect(() => {
    const fetchData = async () => {
      const result = await listUnpaid()
      const activePermits = await getActivePermit()
      if (result) {
        setUnpaidTickets(result)
      }
      if (activePermits) {
        setActivePermits(activePermits)
      }
      const vehicle = await getPrimaryVehicle()
      if (vehicle) {
        setVehicle(vehicle)
        let driverClass = vehicle.vehicleType
        driverClass = driverClass == 'Car' ? 'Remote' : driverClass
        const dailyPermitType = await getDailyPermitType(driverClass)
        setDailyPermitType(dailyPermitType)
      }
    }

    fetchData()
  }, [])

  const handleBuyPermit = async () => {
    if (!vehicle) {
      setRegisterModalOpen(true)
      return
    }

    console.log('Buying a daily permit of the following type: ', dailyPermitType)
    const metaData = {
      permitTypeId: dailyPermitType?.id,
      type: "permit",
      vehicleId: vehicle?.id,
    }
    const amount = dailyPermitType?.price || 0

    await createCheckout("PermitPurchase", amount, metaData)
  }

  const handleRegisterModalClose = () => {
    setRegisterModalOpen(false)
  }

  const handleRegisterAccept = async () => {
    setRegisterModalOpen(false)
    router.push('/register')
  }

  return (
    <Box sx={{mb: 10}}>
      <Box sx={{display: 'flex', flexDirection: 'column', marginTop: 2 }}>
        <Typography variant="h4" sx={{ marginLeft: 1}}>
          {t('tickets')}
        </Typography>
        {unpaidTickets.length === 0 && (
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography variant="h6" sx={{ marginLeft: 1 }}>
              {t('noTickets')} {!isMobile &&(
                <Link href="/ticket" onClick={() => router.push("/ticket")} style={{color: '#1976d2'}} aria-label="Manage Tickets">
                  {t('manageTickets')}.
                </Link>
              )}
            </Typography>
            {isMobile && (
              <Button
                variant="contained"
                sx={{ marginTop: 2, marginLeft: 1 }}
                onClick={() => router.push("/ticket")}
                aria-label="Manage Tickets">
                {t('manageTickets')}
              </Button>
            )}
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
        {activePermits.length > 0 && (
          <Box sx={{bgcolor: 'background.paper',
            alignItems: 'start',
            justifyContent: 'center',
            display: 'grid',
            gridTemplateColumns: {xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)'},
            gap: 2,
            mt: 2}}>
            {activePermits.map((permit, index) => (
              <PermitListCard key={index} permit={permit} />
            ))}
          </Box>
        )}
        {activePermits.length == 0 && (
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" sx={{ marginLeft: 1 }}>
              {t('noPermit')}
              {!isMobile && (
                <Link href="#" style={{color: '#1976d2'}} onClick={handleBuyPermit} aria-label='Buy Daily Permit'>
                {vehicle?.vehicleType ?
                  (vehicle.vehicleType == 'Motorcycle' ? 
                    t('buyDailyMotorcycle') :
                    t('buyDailyRemote')
                  ) :
                  t('buyPermit')
                }
                </Link>
              )}
            </Typography>
            {isMobile && (
              <Button
                variant="contained"
                sx={{ marginTop: 2, marginLeft: 1 }}
                onClick={handleBuyPermit}
                aria-label='Buy Daily Permit'
              >
                {vehicle?.vehicleType ?
                  (vehicle.vehicleType == 'Motorcycle' ? 
                    t('buyDailyMotorcycle') :
                    t('buyDailyRemote')
                  ) :
                  t('buyPermit')
                }
              </Button>
            )}
          </Box>
        )}
      </Box>

      <Modal open={registerModalOpen} onClose={handleRegisterModalClose}>
        <Paper
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '80%', sm: 400 },
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            gap: 1
          }}>
            You do not have a registered vehicle.<br />Register one now? 
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant='contained'
                fullWidth
                color='error'
                onClick={handleRegisterModalClose}
              >
                No
              </Button>
              <Button
                variant='contained'
                fullWidth
                color='success'
                onClick={handleRegisterAccept}
              >
                Yes
              </Button>
            </Box>
          </Box>
        </Paper>
      </Modal>

    </Box>
  )
}