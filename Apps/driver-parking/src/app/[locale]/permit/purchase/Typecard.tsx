'use client'

import * as React from 'react';
import { Card, Typography, Box, 
  // Button, 
  ListItem, 
  Button} from '@mui/material'
import { useTranslations } from 'next-intl'

import { PermitType } from '../../../../permit/index'
// import { getCheckoutSessionUrlAction } from '../../stripe/action'
// import { redirect } from 'next/navigation'

/* reference: https://www.typescriptlang.org/docs/handbook/functions.html */
export default function PermitCard({permit}: { permit: PermitType }) {
  const t = useTranslations('purchase_permit')

  // const purchaseHandler = () => {
  //   alert(`${t('purchased')} ${permitType} ($${permit.price})`)
  // }


   React.useEffect(() => {
  }, []);

  //const convertToSubCurrency = (amount: number, factor = 100) => {
  //  return Math.round(amount * factor);
  //};

  //const priceCurrency = convertToSubCurrency(permit.price);

  const handleClick = async() => {
    /*
  const successUrl = `http://localhost:3000/checkout/?type=${encodeURIComponent(permit.type)}&price=${encodeURIComponent(permit.price)}&status=success`
  const cancelUrl = `http://localhost:3000/checkout/?type=${encodeURIComponent(permit.type)}&price=${encodeURIComponent(permit.price)}&status=cancel`
  //const successUrl = `${process.env.NEXT_PUBLIC_CHECKOUT_URL}?type=${encodeURIComponent(permit.type)}&price=${encodeURIComponent(permit.price)}&status=success`
  //const cancelUrl = `${process.env.NEXT_PUBLIC_CHECKOUT_URL}?type=${encodeURIComponent(permit.type)}&price=${encodeURIComponent(permit.price)}&status=cancel`
    const url = await getCheckoutSessionUrlAction(priceCurrency, permit.type, successUrl, cancelUrl)
    if (url) {
      redirect(url)
    }   
      */
  }
  
  return (
    <ListItem disablePadding>
      {process.env.NEXT_PUBLIC_CHECKOUT_URL}
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
          <Button onClick={() => handleClick()}>Pay for Permit</Button>
        </Box>
      </Card>
    </ListItem>
  )
}
