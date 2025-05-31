'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'

import PermitListCard from './PermitListCard'
import { getUserPermits } from '../actions'
import { Permit } from '../../../../permit'

export default function PermitList() {
  const [permits, setPermits] = useState<Permit[]>([])
  const t = useTranslations('permit_history')

  useEffect(() => {
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
      </Box>
    </Box>
  );
}