'use client'

import Box from '@mui/material/Box'
import List from '@mui/material/List'
import { useState, useEffect } from 'react'

import PermitListCard from './PermitListCard'
import { getUserPermits } from './actions'
import { Permit } from '../../permit'

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
    <Box sx={{width: '100%', bgcolor: 'background.paper'}}>
      <List sx={{bgcolor: 'background.paper'}}>
        {permits && permits.map((permit, index) => (
          <PermitListCard key={index} permit={permit} />
        ))}
      </List>
    </Box>
  );
}