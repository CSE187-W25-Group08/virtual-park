'use client'

import { Card, Typography, Box, Button, ListItem } from '@mui/material'
import { useTranslations } from 'next-intl'

import { Permit } from '../../../../permit/index'

/* reference: https://www.typescriptlang.org/docs/handbook/functions.html */
export default function PermitCard({permit, purchased}: { permit: Permit, purchased: (permit: Permit) => void}) {
  const t = useTranslations('purchase_permit')
  return (
    <ListItem disablePadding>
      <Card sx={{ p: 2, border: 'solid', width: '100%' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography>{permit.type === 'Student' ? t('student') : permit.type === 'Staff' ? t('staff') : permit.type === 'Disabled' ? t('disabled') : ''}
            </Typography>
            <Typography>${permit.price}</Typography>
          </Box>
          <Button variant="contained" color="primary" onClick={() => purchased(permit)}>
            {t('purchase')}
          </Button>
        </Box>
      </Card>
    </ListItem>
  )
}
