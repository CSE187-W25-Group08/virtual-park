'use client'

import { Card, Typography, Box, ListItemButton } from '@mui/material'
import { Permit } from '../../permit/index'

export default function PermitCard({permit}: {permit: Permit}) {
  return (
    <ListItemButton>
      <Card sx={{ p: 2, border: '1px solid #ccc', width: '100%' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography>{permit.type}</Typography>
          <Typography>${permit.price}</Typography>
        </Box>
      </Card>
    </ListItemButton>
  )
}