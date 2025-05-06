'use client'

import * as React from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList, ListChildComponentProps} from 'react-window';
import {fetchDrivers} from './action';
import { Driver } from '@/driver';

// based on MUI https://mui.com/material-ui/react-list/

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

  // https://chatgpt.com/c/68119ae6-b920-8007-b832-ae70486ea142
  const renderRow = ({ index, style }: ListChildComponentProps) => {
    const driver = drivers[index];
  
    return (
      <ListItem style={style} key={driver?.email} component="div" disablePadding>
        <ListItemText
          primary={`${driver?.name} (${driver?.email})`}
          secondary={`Joined: ${new Date(driver?.joinDate).toLocaleDateString()}`}
          sx={{ paddingLeft: 2 }}
        />
      </ListItem>
    );
  };

  return (
    <Box
      sx={{ width: '100%', height: 600, maxWidth: 800, bgcolor: 'background.paper' }}
    >
      <FixedSizeList
        height={600}
        width={800}
        itemSize={46}
        itemCount={drivers.length < 30 ? drivers.length : 30}
        overscanCount={5}
      >
        {renderRow}
      </FixedSizeList>
    </Box>
  );
}
