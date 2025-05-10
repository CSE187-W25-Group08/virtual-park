'use client'; // [REQUIRED for interactivity]

import { useState } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Drawer,
    Box,
    List,
    ListItem,
    ListItemButton,
    ListItemText
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';


export default function Navbar({ locale }: { locale: string }) {
    const [open, setOpen] = useState(false);
    const toggleDrawer = () => setOpen(!open);
  return (
    <>
        <AppBar>
            <Toolbar>
                <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer}
                sx={{ mr: 2 }}
                >
                    <MenuIcon />
                </IconButton>

                <Typography variant="h6" component="div">
                    Virtual Park
                </Typography>
            </Toolbar>
        </AppBar>

        <Drawer anchor="left" open={open} onClose={toggleDrawer}>
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer}>
          <List>
            {[
              { label: 'Dashboard', path: '/dashboard' },
              { label: 'Register Car', path: '/register' },
              { label: 'View Tickets', path: '/ticket' },
              { label: 'Purchase Permit', path: '/permit/purchase' },
              { label: 'Permit History', path: '/permit/history' },
            ].map(({ label, path }) => (
              <Link key={label} href={`/${locale}${path}`} passHref legacyBehavior>
                <ListItem disablePadding>
                  <ListItemButton component="a">
                    <ListItemText primary={label} />
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}


// 'use client'; // [REQUIRED for interactivity]

// import Link from 'next/link';
// import { useState } from 'react';
// import {
//   Drawer,
//   IconButton,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemText,
//   Box
// } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';

// export default function Navbar({ locale }: { locale: string }) {
//   const [open, setOpen] = useState(false);
//   const toggleDrawer = () => setOpen(!open);

//   return (
//     <Box sx={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
//       <IconButton onClick={toggleDrawer}>
//         <MenuIcon />
//       </IconButton>
//       <Drawer anchor="left" open={open} onClose={toggleDrawer}>
//         <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer}>
//           <List>
//             {[
//               { label: 'Register', path: '/register' },
//               { label: 'Tickets', path: '/ticket' },
//               { label: 'Permit', path: '/permit' },
//               { label: 'Logout', path: '/logout' }
//             ].map(({ label, path }) => (
//                 <Link key={label} href={`/${locale}${path}`} passHref legacyBehavior>
//                 <ListItem disablePadding>
//                   <ListItemButton component="a">
//                     <ListItemText primary={label} />
//                   </ListItemButton>
//                 </ListItem>
//               </Link>

//             ))}
//           </List>
//         </Box>
//       </Drawer>
//     </Box>
//   );
// }
