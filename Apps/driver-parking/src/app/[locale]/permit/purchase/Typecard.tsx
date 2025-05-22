'use client'

import { Card, Typography, Box, 
  // Button, 
  ListItem, 
  Button} from '@mui/material'
import { useTranslations } from 'next-intl'

import { PermitType } from '../../../../permit/index'
import { useRouter } from 'next/navigation'

/* reference: https://www.typescriptlang.org/docs/handbook/functions.html */
export default function PermitCard({permit}: { permit: PermitType }) {
  const t = useTranslations('purchase_permit')

  // const purchaseHandler = () => {
  //   alert(`${t('purchased')} ${permitType} ($${permit.price})`)
  // }

  const router = useRouter()

  const handleClick = () => {
    router.push(`/permit/purchase/${permit.type}?price=${permit.price}`)
  }
  
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
          <Button onClick={() => handleClick()}>Test</Button>
        </Box>
      </Card>
    </ListItem>
  )
}
