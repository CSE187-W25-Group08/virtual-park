'use client'

import * as React from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList } from 'react-window';

// based on MUI https://mui.com/material-ui/react-list/

function renderRow(props) {
  const { index, style } = props;

  return (
    <ListItem style={style} key={index} component="div" disablePadding>
      <ListItemButton>
        <ListItemText primary={`Item ${index + 1}`} />
      </ListItemButton>
    </ListItem>
  );
}

export default function VehiclesList() {
  const [vehicles, setVehicles] = React.useState([]);
  React.useEffect(() => {
    
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
