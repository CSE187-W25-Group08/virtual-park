'use client'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty'
import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'

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
      <Typography variant="h4" color="text.primary" align="center" sx={{marginTop: '20px'}}>
        {t('title')}
      </Typography>
      <Box sx={{bgcolor: 'background.paper',
        alignItems: 'start',
        justifyContent: 'center',
        display: 'grid',
        gridTemplateColumns: {xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)'},
        gap: 2,
        mt: 2}}>
        {permits && permits.map((permit, index) => (
          <PermitListCard key={index} permit={permit} />
        ))}
        {permits.length == 0 && (
        <Box>
          <Card 
            sx={{ 
              borderRadius: 3,
              boxShadow: 2,
              p: 2,
              border: '1px solid #ccc',
              width: '100%'
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
    </Box>
  );
}