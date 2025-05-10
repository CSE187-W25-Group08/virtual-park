"use client"

import React from "react"
import { useState } from "react"
import { Typography, Box, Button } from "@mui/material"

export default function Dashboard() {
  const [name, setName] = useState<string | null>(null);

  React.useEffect(() => {
    setName(window.sessionStorage.getItem('name'));
  }, []);

  return (
    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 2 }}>
      <Typography variant="h4">Welcome back,</Typography>
      <Typography variant="h4">{name}.</Typography>
      <Button
        variant="contained"
        sx={{ marginTop: 2 }}
      >
        Buy Permit
      </Button>
    </Box>
    
  )
}