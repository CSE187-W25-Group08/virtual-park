"use client"

import React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Typography, Box, Button, Divider } from "@mui/material"
import Modal from '@mui/material/Modal'
import Paper from '@mui/material/Paper'
import { useTranslations } from "next-intl"

import TicketCard from "../ticket/card"
import PermitListCard from "../permit/history/PermitListCard"
import { Ticket } from "@/ticket"
import { listUnpaid } from "../ticket/actions"
import { Permit } from "@/permit"
import { getActivePermit } from "../dashboard/actions"
import { Vehicle } from '@/register'
import { getPrimaryVehicle } from '../register/actions'

export default function Dashboard() {
  const [unpaidTickets, setUnpaidTickets] = useState<Ticket[]>([])
  const [activePermit, setActivePermit] = useState<Permit | null>(null)
  const [vehicle, setVehicle] = useState<Vehicle | null>(null)
  const [registerModalOpen, setRegisterModalOpen] = useState(false)
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

    const getActiveVehicle = async () => {
      setVehicle(await getPrimaryVehicle());
    }
    fetchData()
    getActiveVehicle()
  }, [])

  const handleBuyPermit = async () => {
    if (!vehicle) {
      setRegisterModalOpen(true)
      return
    }
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
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" sx={{ marginLeft: 1 }}>
              {t('noPermit')}
            </Typography>
            <Button
              variant="contained"
              sx={{ marginTop: 4 }}
              onClick={handleBuyPermit}
            >
              {t('buyPermit')}
            </Button>
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