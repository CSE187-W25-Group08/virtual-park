'use client'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty'
import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong'
import PermitListCard from './PermitListCard'
import { getUserPermits } from '../actions'
import { Permit } from '../../../../permit'
import { useTheme } from '@mui/material'

export default function PermitList() {
  const [permits, setPermits] = useState<Permit[]>([])
  const t = useTranslations('permit_history')
  const theme = useTheme()

  useEffect(() => {
    console.log("permit history useEffect");
    const fetchData = async () => {
      const fetch = await getUserPermits()
      setPermits(fetch)
    }
    fetchData()
  }, [])

  return (
    <Box sx={{mb: 10}}>
      <Box sx={{display:'flex', alignItems:'center', justifyContent:'center', gap: 1, flexDirection:'row', mt: 3}}>
        <ReceiptLongIcon fontSize='large'/>
        <Typography variant="h5" color="text.primary" align="center">
        {t('title')}
        </Typography>
      </Box>
      {(permits && permits.length > 0) && permits.map((permit, index) => (
        <Box sx={{my: 2}}>
          <PermitListCard key={index} permit={permit} />
        </Box>
      ))}
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