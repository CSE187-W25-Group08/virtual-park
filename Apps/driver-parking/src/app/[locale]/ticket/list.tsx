'use client'
import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card'
import { CircularProgress, Box, Typography } from '@mui/material'
import List from '@mui/material/List'
import { useTranslations } from 'next-intl'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import GavelIcon from '@mui/icons-material/Gavel'

import TicketCard from './card'
import { Ticket } from '../../../ticket'
import { list } from './actions'

export default function TicketList() {
  const [paidTicketList, setPaidTicketList] = useState<Ticket[]>([])
  const [unpaidTicket, setUnpaidTicket] = useState<Ticket[]>([])
  const [appealedTickets, setAppealedTickets] = useState<Ticket[]>([])
  const [dataFetched, setDataFeteched] = useState(false)
  const t = useTranslations('ticket')

  useEffect(() => {
    const fetchData = async () => {
      const result = await list();
      if (result) {
        const paid = result.filter((value) => value.paid === true);
        setPaidTicketList(paid);
        const unpaid = result.filter(
          (value) =>
            value.paid === false &&
            (value.appeal == 'null' || value.appeal === "rejected")
        );
        setUnpaidTicket(unpaid);
        const appealed = result.filter(
          (value) => (value.paid === false && (value.appeal === "submitted" || value.appeal === "approved"))
        );
        setAppealedTickets(appealed);
      }

      setDataFeteched(true);
    };
    fetchData();
  }, []);

  const TableHeader = (title: string, type: string) => (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: { md: 2 }, mb: { xs: 1, md: 2 }}}>
        {type === 'unpaid' && <ErrorOutlineIcon fontSize='medium' color="error" />}
        {type === 'appeal' && <GavelIcon fontSize='medium' color="warning" />}
        {type === 'paid' && <CheckCircleOutlineIcon fontSize='medium' color="success" />}
        <Typography variant="h5">{title}</Typography>
      </Box>
    </Box>
  )

  return (
    <Box sx={{ px: 2, mb: 10 }}>
      {!dataFetched && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9001,
          }}
        >
          <CircularProgress color="success" />
        </Box>
      )}
      <List
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        {dataFetched &&
          unpaidTicket.length <= 0 &&
          appealedTickets.length <= 0 &&
          paidTicketList.length <= 0 && (
            <Card sx={{ 
              borderRadius: 3,
              boxShadow: 2,
              p: 2,
              border: '1px solid #ccc',
              width: '100%'
            }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CheckCircleOutlineIcon color='success' />
                  <Typography variant='h5'>{t('noTickets')}</Typography>
                </Box>
              </Box>
            </Card>
          )}

        {unpaidTicket.length > 0 && (
          <>
            {TableHeader(t('unpaid'), 'unpaid')}
            {unpaidTicket.map((ticket, index) => (
              <TicketCard key={index} ticket={ticket} />
            ))}
          </>
        )}
        {appealedTickets.length > 0 && (
          <>
            {TableHeader(t('appeal'), 'appeal')}
            {appealedTickets.map((ticket, index) => (
              <TicketCard key={index} ticket={ticket} />
            ))}
          </>
        )}

        {paidTicketList.length > 0 && (
          <>
            {TableHeader(t('paid'), 'paid')}
            {paidTicketList.map((ticket, index) => (
              <TicketCard key={index} ticket={ticket} />
            ))}
          </>
        )}
      </List>
    </Box>
  )
}
