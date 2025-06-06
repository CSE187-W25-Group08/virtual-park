'use client'

import {Box, Card, Typography, useMediaQuery, useTheme, Grid} from '@mui/material'
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty'
import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong'
import PermitListCard from './PermitListCard'
import { getUserPermits } from '../actions'
import { Permit } from '../../../../permit'

export default function PermitList() {
  const [permits, setPermits] = useState<Permit[]>([])
  const t = useTranslations('permit_history')
  const theme = useTheme()
  const isMobile = useMediaQuery('(max-width:900px)');
  useEffect(() => {
    console.log("permit history useEffect");
    const fetchData = async () => {
      const fetch = await getUserPermits()
      setPermits(fetch)
    }
    fetchData()
  }, [])

  return (
    <Box sx={{mb: 10, width:'100%'}}>
      <Box sx={{display:'flex', alignItems:'center', justifyContent:'center', gap: 1, flexDirection:'row', mt: 3}}>
        <ReceiptLongIcon fontSize='large'/>
        <Typography variant="h5" color="text.primary" align="center">
        {t('title')}
        </Typography>
      </Box>
        {permits.length > 0 && (
          isMobile ? (
            // ✅ Mobile view: single column
            permits.map((permit) => (
              <Box sx={{ my: 2 }} key={permit.id}>
                <PermitListCard permit={permit} />
              </Box>
            ))
          ) : (
            // ✅ Desktop view: grid layout
            <Grid container spacing={2} sx={{ mt: 2, justifyContent: 'center' }}>
              {permits.map((permit) => (
                <Grid xs={12} sm={6} md={4} lg={3} key={permit.id}>
                  <PermitListCard permit={permit} />
                </Grid>
              ))}
            </Grid>
          )
        )}
      {permits.length == 0 && (
        <Box sx={{display:'flex', justifyContent:'center', maxWdith:'800px', mt:2, width:'100%'}}>
          <Card 
            sx={{ 
              borderRadius: 3,
              boxShadow: 2,
              p: 2,
              border: '1px solid #ccc',
              width: {xs: '100%', sm:'90%', md:'75%'},
              maxWidth:'800px'
            }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <HourglassEmptyIcon sx={{ color: theme.palette.secondary.main }} />
                <Typography variant='h6'>{t('noHistory')}</Typography>
              </Box>
            </Box>
          </Card>
        </Box>
      )}
    </Box>
  );
}