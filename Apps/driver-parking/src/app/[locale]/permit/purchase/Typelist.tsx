'use client'

import { useState, useEffect } from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTranslations } from 'next-intl'

import { permitTypes, getUserPermits} from '../actions'
import PermitCard from './Typecard'
import { PermitType } from '../../../../permit'

export default function TypeList() {
  const [permitTypeList, setpermitTypeList] = useState<PermitType[]>([])
  const t = useTranslations('purchase_permit')
  // const [purchased, setPurchased] = useState<Permit | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
      // console.log('Stripe Public Key:', process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
      const permits = await permitTypes()
      const alreadyOwnedPermits = await getUserPermits()
      // https://chatgpt.com/c/68224fea-167c-8007-b525-2167c07b5496
      const now = new Date();
      // Only include permits that are not expired
      const ownedTypes = new Set(
        alreadyOwnedPermits
          .filter(p => new Date(p.expDate) > now)
          .map(p => p.type)
      );
      const updatedPermits = permits.map(p => ({
        ...p,
        purchased: ownedTypes.has(p.type),
      }));
      setpermitTypeList(updatedPermits);}
      catch (e) {
      console.error('Error loading permit types:', e)
      }
    }
    fetchData()
  }, [])

const classes = permitTypeList.reduce((array, permit) => {
  const permitClass = permit.permitClass;
  if (!array[permitClass]) {
    array[permitClass] = [];
  }
  array[permitClass].push(permit);
  return array;
}, {} as Record<string, PermitType[]>);

  return (
    <div style={{ padding: '1rem' }}>
    {Object.entries(classes).map(([permitClass, permits]) => (
      <Accordion key={permitClass}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" component="div">
            {t(permitClass)}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {permits.map((permit) => (
            <PermitCard key={`${permit.type} - ${permit.permitClass}`} permit={permit} />
          ))}
        </AccordionDetails>
      </Accordion>
    ))}
  </div>
  )
}
