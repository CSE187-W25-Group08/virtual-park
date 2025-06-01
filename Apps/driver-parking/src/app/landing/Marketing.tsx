'use client'

import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import Image from 'next/image'
import logo from '../public/img/logo.png'

export default function Marketing() {
  return (
    <Box>
      <AppBar position="fixed" sx={{ backgroundColor: '#1976d2' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* Logo + Text */}
          <Box display="flex" alignItems="center" gap={1}>
            <Image src={logo} alt="Virtual Park Logo" width={40} height={40} />
            <Typography variant="h6" component="div" sx={{ color: 'white' }}>
              Virtual Park
            </Typography>
          </Box>

          {/* Search and Menu Icons */}
          <Box display="flex" alignItems="center" gap={1}>
            <IconButton edge="end" color="inherit">
              <SearchIcon />
            </IconButton>
            <IconButton edge="end" color="inherit">
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Box p={2} mt={8}>
        {Array.from({ length: 50 }).map((_, i) => (
          <Typography key={i} paragraph>
            This is dummy paragraph #{i + 1}
          </Typography>
        ))}
      </Box>
    </Box>
  )
}
