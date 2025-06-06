'use client'

import { useState, useEffect } from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import { Box, Fade } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useTranslations } from 'next-intl'
import { getPrimaryVehicle } from '../../register/actions'
import { getBuyablePermits} from '../actions'
import PermitCard from './Typecard'
import { PermitType } from '../../../../permit'
import { Vehicle } from '../../../../register'
import CreditCardIcon from '@mui/icons-material/CreditCard';

export default function TypeList() {
  const [permitTypeList, setpermitTypeList] = useState<PermitType[]>([])
  const [vehicle, setVehicle] = useState<Vehicle | undefined>(undefined)
  const [dataFetched, setDataFetched] = useState(false)
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

      setDataFetched(true)
    }
    fetchData()
  }, [])

const classes = permitTypeList.reduce((array, permit) => {
  const permitClass = permit.permitClass
  if (!array[permitClass]) {
    array[permitClass] = []
  }
  array[permitClass].push(permit)
  return array
}, {} as Record<string, PermitType[]>)

  return (
  <Fade in={true} timeout={500}>
    <Box sx={{ p: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection:'column', width:'100%'}}>
      {!dataFetched && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9001,
          }}
        >
          <CircularProgress color="success" />
        </Box>
      )}

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 2}}>
        <CreditCardIcon fontSize='large' />
        <Typography variant="h5">
          {t('permits')}
        </Typography>
      </Box>
      <Box sx={{width:'100%', maxWidth:'800px'}}>
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
    </Box>
</Fade>
  )
}
