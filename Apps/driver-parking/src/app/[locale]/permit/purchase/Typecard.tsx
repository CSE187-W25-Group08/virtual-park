'use client'

import * as React from 'react';
import {
  Typography, 
  Box, 
  ListItem, 
  Button,
  Paper,
  Collapse,
  Alert,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  SelectChangeEvent,
} from '@mui/material'
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { useTranslations } from 'next-intl'

import { PermitType } from '../../../../permit/index'
import { Vehicle } from '../../../../register';
import { createCheckout } from '../../../../stripe/helper';
// import { getCheckoutSessionUrlAction } from '../../stripe/action'
// import { redirect } from 'next/navigation'

interface PermitCardProps {
  permit: PermitType;
  vehicle: Vehicle | undefined;
}

/* reference: https://www.typescriptlang.org/docs/handbook/functions.html */
export default function PermitCard({ permit, vehicle }: PermitCardProps) {
  const t = useTranslations('purchase_permit')

  const [showWarning, setShowWarning] = React.useState(false);
  const [hours, setHours] = React.useState(1);

  const isHourly = permit.type === 'Hourly';
  const adjustedPrice = isHourly ? permit.price * hours : permit.price;

  const handleHourChange = (event: SelectChangeEvent<number>) => {
    setHours(Number(event.target.value));
  };

  const handleClick = async() => {
    if (!vehicle) {
      setShowWarning(true);
      return;
    }
    const name = "PermitPurchese";
    const amount = adjustedPrice;
    // Could switch to userId / JWT from cookie ?
    const metaData = {
      permitTypeId: permit?.id,
      type: "permit",
      vehicleId: vehicle?.id,
      price: adjustedPrice,
    }
    await createCheckout(name, amount, metaData)
  }
  
  return (
    <React.Fragment>
     {showWarning && <ListItem disablePadding sx={{ flexDirection: 'column' }}>
        <Collapse in={showWarning} sx={{ width: '100%', mb: 1 }}>
          <Alert severity="warning" onClose={() => setShowWarning(false)}>
          {t('no_vehicle_warning')}
          </Alert>
        </Collapse> 
        </ListItem>}
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
            <Typography>${adjustedPrice}</Typography>
          </Box>
          <Box>
            {isHourly && (
              <FormControl sx={{minWidth: { xs: 50, sm: 120 }}}>
                <InputLabel>{t('hours')}</InputLabel>
                <Select
                  value={hours}
                  label={t('hours')}
                  onChange={handleHourChange}
                >
                  {[1, 2, 3, 4].map(h => (
                    <MenuItem key={h} value={h}>{h}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </Box>
          {permit.purchased ? (
            <CheckRoundedIcon color="success" />
          ) : (
            <Button
              onClick={handleClick}
              disabled={permit.purchased}
              aria-label={`Buy ${permit.permitClass} ${permit.type} Permit`}
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
    </ React.Fragment>
  );
}
