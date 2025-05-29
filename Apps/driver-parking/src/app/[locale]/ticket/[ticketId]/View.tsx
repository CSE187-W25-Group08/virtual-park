"use client";
import React from "react";
import TicketCard from "./Card";
import { AppBar, Box, Toolbar, Typography, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export default function View({ ticketId }: { ticketId: string }) {
  const router = useRouter();
  const t = useTranslations("ticket_details");

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
          <Typography>{t('viewTicket')}</Typography>
        </Toolbar>
      </AppBar>

      <Box sx={{ mt: 8, px: 2 }}>
        <TicketCard ticketId={ticketId}/>
      </Box>
    </React.Fragment>
  );
}
