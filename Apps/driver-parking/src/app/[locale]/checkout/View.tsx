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
          <Typography>Go Back</Typography>
        </Toolbar>
      </AppBar>

      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <CheckCircleIcon color="success" sx={{ fontSize: 80 }} />
        <Typography variant="h4" gutterBottom>
          Purchase {status}
        </Typography>
        <Typography>
          You’ve purchased a <strong>{type}</strong> for{" "}
          <strong>${amount}</strong>.
        </Typography>
        <Box>
          <Button
            variant="contained"
            color="primary"
            onClick={() => router.push("/dashboard")}
          >
            Go to Dashboard
          </Button>
        </Box>
      </Box>
    </React.Fragment>
  );
}
