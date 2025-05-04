'use client'

import { Card, Typography, Box, Button, ListItem } from '@mui/material'
import { Permit } from '../../permit/index'

/* reference: https://www.typescriptlang.org/docs/handbook/functions.html */
export default function typeCard({permit, purchased}: { permit: Permit, purchased: (permit: Permit) => void}) {
  return (
    <ListItem disablePadding>
      <Card sx={{ p: 2, border: 'solid', width: '100%' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography>{permit.type}</Typography>
            <Typography>${permit.price}</Typography>
          </Box>
          <Button variant="contained" color="primary" onClick={() => purchased(permit)}>
            Purchase
          </Button>
        </Box>
      </Card>
    </ListItem>
  )
}
