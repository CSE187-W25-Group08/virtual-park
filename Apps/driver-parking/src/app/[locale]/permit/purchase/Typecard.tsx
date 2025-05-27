'use client'

import * as React from 'react';
import {
  Typography, 
  Box, 
  ListItem, 
  Button,
  Paper
} from '@mui/material'
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
      <Paper
        elevation={3}
        sx={{
          p: 2,
          width: '100%',
          mb: 2,
          borderRadius: 3,
          transition: 'transform 0.2s, box-shadow 0.2s',
          '&:hover': {
            transform: 'scale(1.01)',
            boxShadow: 6,
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box>
            <Typography variant="h6">{t(permit.type)}</Typography>
            <Typography>${permit.price}</Typography>
          </Box>
          {permit.purchased ? (
            <CheckRoundedIcon color="success" />
          ) : (
            <Button
              onClick={handleClick}
              disabled={permit.purchased}
              variant="contained"
              color="primary"
              sx={{ borderRadius: 2 }}
            >
              {t('buy')}
            </Button>
          )}
        </Box>
      </Paper>
    </ListItem>
  );
}
