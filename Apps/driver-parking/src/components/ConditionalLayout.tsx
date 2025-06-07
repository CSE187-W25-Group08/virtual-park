'use client';

import { usePathname } from '@/i18n/navigation';
import { ReactNode } from 'react';
import Navbar from './Navbar';
import BottomNavbar from './BottomNavbar';
import { Toolbar, Box } from '@mui/material';

interface ConditionalLayoutProps {
  children: ReactNode;
  isLoggedIn: boolean;
}

export default function ConditionalLayout({ children, isLoggedIn }: ConditionalLayoutProps) {
  const pathname = usePathname();
  const SIDEBAR_WIDTH = 250;
  
  // Check if we're on the landing page
  const isLandingPage = pathname === '/';

  if (isLoggedIn && !isLandingPage) {
    return (
      <>
        <Navbar />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            ml: { sm: 0, md: `${SIDEBAR_WIDTH}px` },
          }}
        >
          <Toolbar />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 2,
              overflowY: 'auto',
            }}
          >
            {children}
          </Box>
          <Box
            sx={{
              position: 'fixed',
              bottom: 0,
              width: '100%',
              zIndex: 1300,
            }}
          >
            <BottomNavbar />
          </Box>
        </Box>
      </>
    );
  }

  return <main>{children}</main>;
}