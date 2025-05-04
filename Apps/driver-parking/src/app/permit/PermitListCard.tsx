'use client'

import ListItem from '@mui/material/ListItem'
import PropTypes from 'prop-types'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

import { Permit } from '../../permit'

const PermitListCard = ({permit}: {permit: Permit}) => {
  return (
    <ListItem disablePadding>
      <Box>
        <Typography variant="body1" color="text.primary">
          {permit.type}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {`Permit Price: $${permit.price}`}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {`Issue Date: ${timeFormatter(permit.issueDate)}`}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {`Expiry Date: ${timeFormatter(permit.expDate)}`}
        </Typography>
        
      </Box>
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