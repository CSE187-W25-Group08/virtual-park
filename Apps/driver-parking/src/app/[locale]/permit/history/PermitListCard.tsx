'use client'

import ListItem from '@mui/material/ListItem'
import PropTypes from 'prop-types'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

import { Permit } from '../../../../permit'

const PermitListCard = ({permit}: {permit: Permit}) => {
  return (
    <ListItem disablePadding>
      <Card raised sx={{ width: '300px', height: '200px', marginTop: '20px', alignItems: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <CardContent>
          <Typography variant="h5" color="text.primary" align="center" gutterBottom>
            {permit.type}
          </Typography>
          <Typography variant="body1" color="text.secondary" align="center" gutterBottom>
            ${permit.price}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {`Issue Date: ${timeFormatter(permit.issueDate)}`}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {`Expiry Date: ${timeFormatter(permit.expDate)}`}
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