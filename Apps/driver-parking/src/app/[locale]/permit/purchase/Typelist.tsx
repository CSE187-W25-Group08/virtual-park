'use client'

import { useState, useEffect } from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTranslations } from 'next-intl'
import { getPrimaryVehicle } from '../../register/actions';
import { getBuyablePermits} from '../actions'
import PermitCard from './Typecard'
import { PermitType } from '../../../../permit'
import { Vehicle } from '../../../../register'

export default function TypeList() {
  const [permitTypeList, setpermitTypeList] = useState<PermitType[]>([])
  const [vehicle, setVehicle] = useState<Vehicle | undefined>(undefined)
  const t = useTranslations('purchase_permit')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [permitTypes, vehicleResult] = await Promise.all([
          getBuyablePermits(),
          getPrimaryVehicle()
        ])
        
        setpermitTypeList(permitTypes)
        setVehicle(vehicleResult)
      }
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
    <Box sx={{ p: 1 }}>
      {Object.entries(classes).map(([permitClass, permits]) => (
        <Accordion key={permitClass}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6" component="div">
              {t(permitClass)}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {permits.map((permit) => (
                <PermitCard key={`${permit.type} - ${permit.permitClass}`} permit={permit} vehicle={vehicle}/>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  )
}
