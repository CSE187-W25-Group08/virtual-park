"use client";
import React from "react";
import Card from "./Card";
import { Box} from "@mui/material";

export default function View({ driverId }: { driverId: string }) {

  return (
    <React.Fragment>

      <Box sx={{ mt: 8, px: 2 }}>
        <Card driverId={driverId}/>
      </Box>
    </React.Fragment>
  );
}
