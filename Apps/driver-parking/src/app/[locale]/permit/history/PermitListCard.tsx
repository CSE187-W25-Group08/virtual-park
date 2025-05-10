'use client'

import ListItem from '@mui/material/ListItem'
import PropTypes from 'prop-types'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { useTranslations } from 'next-intl'

import { Permit } from '../../../../permit'

const PermitListCard = ({permit}: {permit: Permit}) => {
  const t = useTranslations('permit_history')
  return (
    <ListItem disablePadding>
      <Card sx={{ width: '100%', marginTop: '20px', borderRadius: 3, boxShadow: 2, border: '1px solid #ccc', p: 2 }}>
        <CardContent>
          <Typography variant="h5" color="text.primary" align="center" gutterBottom>
            {permit.type === 'Student' ? t('student') : permit.type === 'Staff' ? t('staff') : permit.type === 'Disabled' ? t('disabled') : ''}
          </Typography>
          <Typography variant="body1" color="text.secondary" align="center" gutterBottom>
            ${permit.price}
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center" gutterBottom>
            {t('issued')}{timeFormatter(permit.issueDate)}
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center">
            {t('expires')}{timeFormatter(permit.expDate)}
          </Typography>
        </CardContent>
      </Card>
    </ListItem>
  )
}

function timeFormatter(date: string) {
  const dateObj = new Date(date)
  const dateStr = dateObj.toLocaleDateString([], {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
  const timeStr = dateObj.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
  return `${dateStr} at ${timeStr}`
}

PermitListCard.propTypes = {
  permit: PropTypes.any,
}

export default PermitListCard