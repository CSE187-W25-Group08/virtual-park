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
export default function NavList() {
  // MUI example https://github.com/mui/material-ui/blob/v7.1.0/docs/data/material/getting-started/templates/dashboard/components/MenuContent.tsx
  const listItems = [
    { text: 'Home', page: "/", icon: <HomeRoundedIcon /> },
    { text: 'Drivers', page: "/drivers", icon: <PeopleRoundedIcon /> },
  ];
  const nav = (page: string) => {
    console.log('redirecting to', page);
  }
  return (
    <List dense>
    {listItems.map((item, index) => (
      <ListItem key={index} disablePadding sx={{ display: 'block' }}>
        <ListItemButton selected={index === 0} onClick={() => nav(item.page)}>
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.text} />
        </ListItemButton>
      </ListItem>
    ))}
  </List>
  )
}