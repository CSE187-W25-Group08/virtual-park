"use client"
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemButton
} from'@mui/material'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export default function NavList() {
  const listItems = [
    { text: 'Home', page: "/", icon: <HomeRoundedIcon /> },
    { text: 'Drivers', page: "/drivers", icon: <PeopleRoundedIcon /> },
  ];

  const router = useRouter();
  const pathname = usePathname();
  const currentIndex = listItems.findIndex(item => item.page === pathname);
  const [selectedIndex, setSelectedIndex] = useState(currentIndex >= 0 ? currentIndex : 0);

  const handleClick = (index: number, page: string) => {
    setSelectedIndex(index);
    router.push(page);
  };
  // MUI example https://github.com/mui/material-ui/blob/v7.1.0/docs/data/material/getting-started/templates/dashboard/components/MenuContent.tsx
  return (
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
  );
}