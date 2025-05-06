'use client'

import * as React from 'react';
import {
  Box,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { FixedSizeList, ListChildComponentProps} from 'react-window';
import { fetchDrivers } from './action';
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
      <ListItem 
        style={style} 
        key={driver?.email} 
        component="div" 
        disablePadding 
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between', // Changed from space-evenly
          width: '100%', // Added to ensure full width
          border: '5px solid black'
        }}
      >
        <ListItemIcon sx={{ minWidth: 'auto', mr: 2 }}> {/* Adjusted minWidth */}
          <PersonIcon sx={{ fontSize: 40 }} /> {/* Directly set icon size */}
        </ListItemIcon>
        <ListItemText 
          primary={driver?.name}
          slotProps={{ primary: { style: { fontSize: '1.2rem' } }}}
          sx={{ flex: 1, textAlign: 'left' }}
        />
        <ListItemText 
          primary={driver?.email}
          primaryTypographyProps={{ style: { fontSize: '1.2rem' } }}
          sx={{ flex: 1, textAlign: 'left' }}
        />
        <ListItemText 
          primary={`Joined: ${new Date(driver?.joinDate).toLocaleDateString()}`}
          primaryTypographyProps={{ style: { fontSize: '1.2rem' } }}
          sx={{ flex: 1, textAlign: 'left' }}
        />
      </ListItem>
    );
  };

  return (
    <Box
      sx={{ display:'flex', alignItems:'center', justifyContent:'center', width: '100%', height:'100%', bgcolor: 'background.paper' }}
    >
      <FixedSizeList
        height={800}
        width={1000}
        itemSize={100}
        itemCount={drivers.length < 30 ? drivers.length : 30}
        overscanCount={5}
      >
        {renderRow}
      </FixedSizeList>
    </Box>
  );
}
