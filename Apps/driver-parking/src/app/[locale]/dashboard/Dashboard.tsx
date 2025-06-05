"use client"

import React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate'
import Card from '@mui/material/Card'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import { Typography, Box, Button, Divider, useTheme, Fade } from "@mui/material"
import Modal from '@mui/material/Modal'
import Paper from '@mui/material/Paper'
import ReceiptIcon from '@mui/icons-material/Receipt'
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout'
import VerifiedIcon from '@mui/icons-material/Verified'
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
  const theme = useTheme()
  

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
    const amount = dailyPermitType?.price || 0
    const metaData = {
      permitTypeId: dailyPermitType?.id,
      type: "permit",
      vehicleId: vehicle?.id,
      price: amount
    }

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
                              <Fade in={true} timeout={500}>
    <Box sx={{mb: 10}}>
      <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <ReceiptIcon fontSize='large' />
          <Typography variant="h4">
            {t('tickets')}
          </Typography>
        </Box>
        {unpaidTickets.length === 0 && (
          <Card 
            sx={{ 
              borderRadius: 3,
              boxShadow: 2,
              p: 2,
              border: '1px solid #ccc',
              width: '100%'
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CheckCircleOutlineIcon color='success' />
                <Typography variant="h6">
                  {t('noTickets')} {!isMobile &&(
                    <Link href="/ticket" onClick={() => router.push("/ticket")} style={{color: '#1976d2'}} aria-label="Manage Tickets">
                      <AssignmentLateIcon sx={{ mr: 1 }}/>
                      {t('manageTickets')}.
                    </Link>
                  )}
                </Typography>
              </Box>
              {isMobile && (
                <Button
                  variant="contained"
                  sx={{ marginTop: 2, marginLeft: 1 }}
                  onClick={() => router.push("/ticket")}
                  aria-label="Manage Tickets">
                  <AssignmentLateIcon sx={{ mr: 1 }}/>
                  {t('manageTickets')}
                </Button>
              )}
            </Box>
          </Card>
        )}
        {unpaidTickets.length > 0 && (
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: 'center', marginTop: 2, width: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginBottom: 2 }}>
              <ErrorOutlineIcon color='error'/>
              <Typography variant="body1" color="error">
                {t('unpaidTickets', { count: unpaidTickets.length })}
              </Typography>
            </Box>
            {unpaidTickets.map((ticket, index) => (
              <TicketCard key={index} ticket={ticket} />
            ))}
          </Box>
        )}
        <Divider color={theme.palette.secondary.main} sx={{ width: "100%", marginTop: 4 }}/>
      </Box>
      <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 2, m:1}}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1}}>
          <VerifiedIcon fontSize='large' />
          <Typography variant="h4">
            {t('permit')}
          </Typography>
        </Box>
        {activePermits.length > 0 && (
          <Box sx={{
            alignItems: 'start',
            justifyContent: 'center',
            display: 'grid',
            gridTemplateColumns: {xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)'},
            gap: 2,
            mt: 2, width: '100%'}}>
            {activePermits.map((permit, index) => (
              <PermitListCard key={index} permit={permit} />
            ))}
          </Box>
        )}
        {activePermits.length == 0 && (
          <Card 
            sx={{ 
              borderRadius: 3,
              boxShadow: 2,
              p: 2,
              border: '1px solid #ccc',
              width: '100%'
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography variant="h6" sx={{ marginLeft: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <ErrorOutlineIcon color="error" />
                  {t('noPermit')}
                </Box>
                {!isMobile && (
                  <Link href="#" style={{color: '#1976d2'}} onClick={handleBuyPermit} aria-label='Buy Daily Permit'>
                  <ShoppingCartCheckoutIcon sx={{ mr: 1 }}/>
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
                  <ShoppingCartCheckoutIcon sx={{ mr: 1 }}/>
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
          </Card>
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
</Fade>
  )
}