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
  let permitType
  if (permit.type === 'Student') {
    permitType = t('student')
  } else if (permit.type === 'Staff') {
    permitType = t('staff')
  } else if (permit.type === 'Disabled') {
    permitType = t('disabled')
  }


  return (
    <ListItem disablePadding>
      <Card sx={{ width: '100%', marginTop: '20px', borderRadius: 3, boxShadow: 2, border: '1px solid #ccc', p: 2 }}>
        <CardContent>
          <Typography variant="h5" color="text.primary" align="center" gutterBottom>
            {permitType}
          </Typography>
          <Typography variant="body1" color="text.secondary" align="center" gutterBottom>
            ${permit.price}
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center" gutterBottom>
            {t('issued')}{timeFormatter(permit.issueDate)}
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center" gutterBottom>
            {t('expires')}{timeFormatter(permit.expDate)}
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center">
            {t('timeLeft')} {timeRemaining(permit.expDate)}
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

function timeRemaining(date: string) {
  const dateObj = new Date(date)
  const now = new Date()
  const diff = dateObj.getTime() - now.getTime()

  let days = Math.floor(diff / (1000 * 60 * 60 * 24))
  let hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

  if (days < 0) {
    days = 0
  }
  if (hours < 0) {
    hours = 0
  }
  if (minutes < 0) {
    minutes = 0
  }

  return `${days}d:${hours}h:${minutes}m`
}

PermitListCard.propTypes = {
  permit: PropTypes.any,
}

export default PermitListCard