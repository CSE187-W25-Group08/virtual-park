"use client";
import React from "react";
import Card from "./Card";
import { AppBar, Box, Toolbar, Typography, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { useRouter } from "next/navigation";

export default function View({ ticketId }: { ticketId: string }) {
  const router = useRouter();

  const handleBack = () => {
    router.push("/ticket");
    window.scrollTo(0, 0);
  };

  return (
    <React.Fragment>
      <AppBar>
        <Toolbar>
          <IconButton
              edge="start"
              color="inherit"
              aria-label="back"
              onClick={handleBack}
            >
              <ArrowBackIcon />
            </IconButton>
          <Typography>View Ticket</Typography>
        </Toolbar>
      </AppBar>

      <Box sx={{ mt: 8, px: 2 }}>
        <Card ticketId={ticketId}/>
      </Box>
    </React.Fragment>
  );
}
