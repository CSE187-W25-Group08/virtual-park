'use client'

import * as React from 'react';
import { Card, Typography, Box, 
  Chip,
  ListItem, 
  Button} from '@mui/material'
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { useTranslations } from 'next-intl'

import { PermitType } from '../../../../permit/index'
import { getPrimaryVehicle } from '../../register/actions';
import { Vehicle } from '../../../../register';
import { createCheckout } from '../../../../stripe/helper';
// import { getCheckoutSessionUrlAction } from '../../stripe/action'
// import { redirect } from 'next/navigation'

/* reference: https://www.typescriptlang.org/docs/handbook/functions.html */
export default function PermitCard({permit}: { permit: PermitType }) {
  const t = useTranslations('purchase_permit')

  const [vehicle, setVehicle] = React.useState<Vehicle | null>(null);

   React.useEffect(() => {
    const getActiveVehicle = async () => {
      setVehicle(await getPrimaryVehicle());
    }
    getActiveVehicle();
  }, []);

  //const convertToSubCurrency = (amount: number, factor = 100) => {
  //  return Math.round(amount * factor);
  //};

  //const priceCurrency = convertToSubCurrency(permit.price);

  const handleClick = async() => {
    if (!vehicle) {
      alert('Please select a vehicle first');
      return;
    }
    const name = "PermitPurchese";
    const amount = permit?.price;
    // meta data includes cookie as well
    const metaData = {
      permitTypeId: permit?.id,
      type: "permit",
      vehicleId: vehicle?.id,
    }
    // console.log("name", name)
    // console.log("amount", amount)
    // console.log("metaData", metaData)
    await createCheckout(name, amount, metaData)
  }
  
  return (
    <ListItem disablePadding>
      <Card sx={{ p: 2, border: 'solid', width: '100%', mb: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h6">{t(permit.type)}</Typography>
            <Typography>${permit.price}</Typography>
          </Box>
          {(permit.purchased) ? (
            <CheckRoundedIcon />
            ) : (
            <Button
              onClick={handleClick}
              disabled={permit.purchased}
              variant="contained"
              color="primary"
            > {t('buy')} </Button>)}
        </Box>
      </Card>
    </ListItem>
  )
}
