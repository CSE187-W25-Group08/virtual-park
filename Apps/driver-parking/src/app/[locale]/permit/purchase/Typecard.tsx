'use client'

import { Card, Typography, Box, 
  // Button, 
  ListItem } from '@mui/material'
import { useTranslations } from 'next-intl'

import { PermitType } from '../../../../permit/index'

/* reference: https://www.typescriptlang.org/docs/handbook/functions.html */
export default function PermitCard({permit}: { permit: PermitType }) {
  const t = useTranslations('purchase_permit')

  // const purchaseHandler = () => {
  //   alert(`${t('purchased')} ${permitType} ($${permit.price})`)
  // }
  
  return (
    <ListItem disablePadding>
      <Card sx={{ p: 2, border: 'solid', width: '100%', mb: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography>
              {t(permit.type)}
            </Typography>
            <Typography>${permit.price}</Typography>
          </Box>
          {/* <Button variant="contained" aria-label={`Purchase ${permitType} Permit`} color="primary" onClick={purchaseHandler}>
            {t('purchase')}
          </Button> */}
        </Box>
      </Card>
    </ListItem>
  )
}
