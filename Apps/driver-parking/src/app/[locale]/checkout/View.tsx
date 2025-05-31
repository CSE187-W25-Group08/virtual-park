"use client";
import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Button,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

import {} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function View({
  type,
  amount,
  status,
}: {
  type: string;
  amount: number;
  status: string;
}) {
  const handleBack = () => {
    router.push("/permit/purchase");
    window.scrollTo(0, 0);
  };
  const router = useRouter();
  const t = useTranslations("checkout");

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
          <Typography>{t('goBack')}</Typography>
        </Toolbar>
      </AppBar>

      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <CheckCircleIcon color="success" sx={{ fontSize: 80, mt:5 }} />
        <Typography variant="h4" sx = {{mt : 1}} gutterBottom >
          {t('purchase')} {status}
        </Typography>
        <Typography sx = {{mt : 1}}>
          {t('message', {type: type})} <strong>${amount}</strong>.
        </Typography>
        <Box>
          <Button
            sx = {{mt: 1.5}}
            variant="contained"
            color="primary"
            onClick={() => router.push("/dashboard")}
          >
            {t('dashboard')}
          </Button>
        </Box>
      </Box>
    </React.Fragment>
  );
}
