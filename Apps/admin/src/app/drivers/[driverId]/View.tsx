"use client";
import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Box, Typography } from '@mui/material';
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';
import MoneyIcon from '@mui/icons-material/Money';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import TicketCollapsable from './ticket/Collapsable';
import PermitCollapsable from './permit/Collapsable';
import VehicleCollapsable from './vehicle/Collapsable';

export default function View({ driverId }: { driverId: string }) {
  const [open, setOpen] = React.useState({
    ticket: false,
    vehicle: false,
    permit: false,
  });


  const handleToggle = (key: keyof typeof open) => {
    setOpen((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  function MenuItem({
    label,
    open,
    onClick,
    icon = <InboxIcon />,
  }: {
    label: string;
    open: boolean;
    onClick: () => void;
    icon?: React.ReactNode;
  }) {
    return (
      <ListItemButton onClick={onClick}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={label} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
    );
  }

  return (
    <Box
      sx={{ width: '100%', bgcolor: 'background.paper' }}
      component="nav"
    >
      <Typography variant="h4">User</Typography>

      <MenuItem
        label="Ticket"
        open={open.ticket}
        onClick={() => handleToggle('ticket')}
        icon = {<AirplaneTicketIcon/>}
      />
      <Collapse in={open.ticket} timeout="auto" unmountOnExit>
      <TicketCollapsable driverId={driverId}/>
      </Collapse>

      <MenuItem
        label="Permit"
        open={open.permit}
        onClick={() => handleToggle('permit')}
        icon = {<MoneyIcon/>}
      />
      <Collapse in={open.permit} timeout="auto" unmountOnExit>
      <PermitCollapsable driverId={driverId}/>
      </Collapse>

      <MenuItem
        label="Vehicle"
        open={open.vehicle}
        onClick={() => handleToggle('vehicle')}
        icon = {<AgricultureIcon/>}
      />
      <Collapse in={open.vehicle} timeout="auto" unmountOnExit>
      <VehicleCollapsable driverId={driverId}/>
      </Collapse>
    </Box>
  );
}