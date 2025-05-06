'use client'

import * as React from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList } from 'react-window';
import {fetchDrivers} from './action';
import { Driver } from '@/driver';

// based on MUI https://mui.com/material-ui/react-list/

function renderRow(props : any) {
  const { index, style } = props;

  return (
    <ListItem style={style} key={index} component="div" disablePadding>
        <ListItemText primary={`Item ${index + 1}`} />
    </ListItem>
  );
}

export default function DriversList() {
  const [drivers, setDrivers] = React.useState<Driver[]>([]);
  const setDriverData = async () => {
    const driverList = await fetchDrivers();
    if (driverList) {
      setDrivers(driverList);
    }
  };
  React.useEffect(() => {
    setDriverData()
  }, [])

  return (
    <Box
      sx={{ width: '100%', height: 600, maxWidth: 800, bgcolor: 'background.paper' }}
    >
      <FixedSizeList
        height={600}
        width={800}
        itemSize={46}
        itemCount={1000}
        overscanCount={5}
      >
        {renderRow}
      </FixedSizeList>
    </Box>
  );
}
