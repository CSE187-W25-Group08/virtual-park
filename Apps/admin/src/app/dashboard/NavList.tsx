"use client"
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  Box,
  Divider,
  Typography
} from'@mui/material'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import LocalPoliceIcon from '@mui/icons-material/LocalPolice';
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export default function NavList() {
  const listItems = [
    { text: 'Home', page: "/", icon: <HomeRoundedIcon /> },
    { text: 'Drivers', page: "/drivers", icon: <PeopleRoundedIcon /> },
    { text: 'Enforcement', page: '/enforcement', icon: <LocalPoliceIcon />},
    { text: 'Lots', page: "/lots", icon: <LocalParkingIcon /> },
  ];

  const router = useRouter();
  const pathname = usePathname();

  // https://chatgpt.com/c/68224fea-167c-8007-b525-2167c07b5496
  const getIndexFromPath = () =>
    listItems.findIndex(item =>
      pathname === item.page || pathname.startsWith(item.page + "/")
    );

  const [selectedIndex, setSelectedIndex] = useState(getIndexFromPath());
  useEffect(() => {
    const index = getIndexFromPath();
    if (index !== selectedIndex) {
      setSelectedIndex(index);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleClick = (index: number, page: string) => {
    setSelectedIndex(index);
    router.push(page);
  };

  const currentPageName = listItems[selectedIndex]?.text || "Unknown";
  // MUI example https://github.com/mui/material-ui/blob/v7.1.0/docs/data/material/getting-started/templates/dashboard/components/MenuContent.tsx
  return (
    <Box>
      <Box sx={{ p: 3 }}>
        <Typography variant="h5">Dashboard &gt; {currentPageName} </Typography>
      </Box>
      <Divider />
      <List dense>
        {listItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              selected={index === selectedIndex}
              onClick={() => handleClick(index, item.page)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}