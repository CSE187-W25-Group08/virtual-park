"use client";

import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";

import CardContent from "@mui/material/CardContent";
import { useTranslations } from "next-intl";

import { Alert, Box, Fade } from "@mui/material";
import { Permit } from "../../../../permit";

const PermitListCard = ({ permit }: { permit: Permit }) => {
  const t = useTranslations("permit_history");

  return (
  <Fade in={true} timeout={500}>
    <Box
      sx={{
        bgcolor: 'background.paper',
        width: { xs: "95%", sm: "400px" },
        borderRadius: 3,
        boxShadow: 2,
        border: "1px solid #ccc",
        mx: "auto",
        my: 2,
      }}
    >
      <CardContent>
        <Alert
          icon={false}
          sx={{ display: "flex", justifyContent: "center", p: 0, mb: 2 }}
        >
          <Typography variant={"h6"} color="primary">
            <strong>{t(permit.type)}</strong>
          </Typography>
        </Alert>
        <Typography
          variant="body1"
          color="text"
          gutterBottom
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <strong>{t("Cost")}</strong>${permit.price}
        </Typography>
        <Typography
          variant="body1"
          color="text"
          gutterBottom
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <strong>{t("Type")}</strong>
          {t(permit.permitClass)}
        </Typography>
        <Typography
          variant="body1"
          color="text"
          gutterBottom
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <strong>{t("issued")}</strong>
          {timeFormatter(permit.issueDate)}
        </Typography>
        <Typography
          variant="body1"
          color="text"
          gutterBottom
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <strong>{t("expires")}</strong>
          {timeFormatter(permit.expDate)}
        </Typography>
        <Typography
          variant="body1"
          color="text"
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <strong>{t("timeLeft")}</strong>
          {timeRemaining(permit.expDate)}
        </Typography>
      </CardContent>
    </Box>
</Fade>
  );
};

function timeFormatter(date: string) {
  const dateObj = new Date(date);
  const dateStr = dateObj.toLocaleDateString([], {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "America/Los_Angeles",
  });
  const timeStr = dateObj.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "America/Los_Angeles",
  });
  return `${dateStr} at ${timeStr}`;
}

function timeRemaining(date: string) {
  const dateObj = new Date(date);
  const now = new Date();
  const diff = dateObj.getTime() - now.getTime();

  let days = Math.floor(diff / (1000 * 60 * 60 * 24));
  let hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  if (days < 0) {
    days = 0;
  }
  if (hours < 0) {
    hours = 0;
  }
  if (minutes < 0) {
    minutes = 0;
  }

  return `${days}d:${hours}h:${minutes}m`;
}

PermitListCard.propTypes = {
  permit: PropTypes.any,
};

export default PermitListCard;
