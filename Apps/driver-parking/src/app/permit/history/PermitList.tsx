'use client'

import Box from '@mui/material/Box'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import { useState, useEffect } from 'react'

import PermitListCard from './PermitListCard'
import { getUserPermits } from '../purchase/actions'
import { Permit } from '../../../permit'

export default function PermitList() {
  const [permits, setPermits] = useState<Permit[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const fetch = await getUserPermits()
      setPermits(fetch)
    }
    fetchData()
  }, [])

  return (
    <Box sx={{width: '100%', bgcolor: 'background.paper', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
      <Typography variant="h4" color="text.primary" align="center" sx={{marginTop: '20px'}}>
        Purchase History
      </Typography>
      <List sx={{bgcolor: 'background.paper', alignItems: 'center', display: 'flex', flexDirection: 'column'}}>
        {permits && permits.map((permit, index) => (
          <PermitListCard key={index} permit={permit} />
        ))}
      </List>
    </Box>
  );
}