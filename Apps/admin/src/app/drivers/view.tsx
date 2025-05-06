'use client'

import * as React from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList } from 'react-window';
import {fetchVehicles} from './action';
import { Vehicle } from '@/vehicle';

// based on MUI https://mui.com/material-ui/react-list/

function renderRow(props : any) {
  const { index, style } = props;

  return (
    <ListItem style={style} key={index} component="div" disablePadding>
        <ListItemText primary={`Item ${index + 1}`} />
    </ListItem>
  );
}

export default function VehiclesList() {
  const [vehicles, setVehicles] = React.useState<Vehicle[]>([]);
  const setVehicleData = async () => {
    const vehicleList = await fetchVehicles();
    if (vehicleList) {
      setVehicles(vehicleList);
    }
  };
  React.useEffect(() => {
    setVehicleData()
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
