"use client";
import React, { useEffect, useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import ErrorIcon from '@mui/icons-material/Error';
import CardMedia from "@mui/material/CardMedia";
import { Box, Typography, Alert, Grid } from "@mui/material";
import Fab from "@mui/material/Fab";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import FrontHandIcon from "@mui/icons-material/FrontHand";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

import AppealModal from "./AppealModal";
import { Ticket } from "@/ticket";
import {
  getTicketById,
  // setTicketPaid,
  setTicketAppealed,
} from "../actions";
import { Vehicle } from "@/register";
import { getVehicleById } from "../../register/actions";
import { createCheckout } from "../../../../stripe/helper";

export default function TicketCard({ ticketId }: { ticketId: string }) {
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [appealModalOpen, setAppealModalOpen] = useState(false);
  const t = useTranslations("ticket_details");
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const result = await getTicketById(ticketId);
      if (result) {
        setTicket(result);

        const vehicle = await getVehicleById(result.vehicle);
        if (vehicle) {
          setVehicle(vehicle);
        }
      }
    };
    fetchData();
  }, [ticketId]);
  const handleHourDate = (dateArg: string) => {
    const dateReceived = new Date(dateArg);
    const now = new Date();

    const isToday = dateReceived.toDateString() === now.toDateString();

    const yesterday = new Date();
    yesterday.setDate(now.getDate() - 1);
    const isYesterday =
      dateReceived.toDateString() === yesterday.toDateString();

    const options: Intl.DateTimeFormatOptions = {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    };

    const timeString = dateReceived.toLocaleTimeString(undefined, options);

    if (isToday) {
      return `${t("today")} ${timeString}`;
    } else if (isYesterday) {
      return `${t("yesterday")} ${timeString}`;
    } else {
      const datePart = dateReceived.toLocaleDateString(undefined, {
        weekday: "long",
        month: "long",
        day: "numeric",
      });
      return `${datePart} at ${timeString}`;
    }
  };

  const handleClickPaid = async () => {
    const name = ticket?.violation || "oops";
    const amount = ticket?.cost || 0;
    // meta data includes cookie as well
    const metaData = {
      id: ticketId,
      type: "ticket",
    };
    await createCheckout(name, amount, metaData);
  };

  const handleOpenAppealModal = () => {
    setAppealModalOpen(true);
  };

  const handleCloseAppealModal = () => {
    setAppealModalOpen(false);
  };

  const handleSubmitAppeal = async (appealReason: string) => {
    const appealedTicket = await setTicketAppealed(
      ticketId,
      "submitted",
      appealReason
    );
    if (appealedTicket) {
      setTicket(appealedTicket);
      handleCloseAppealModal();
      router.push("/ticket");
    }
  };

  const appealed = ticket?.appeal != "null";

  const appealedDisplay = (ticket: Ticket) => {
    return (
          <Typography>
            <strong>{t("appealStatus")}</strong>&nbsp;
            <Typography
              component="span"
              sx={{
                color:
                  ticket?.appeal === "submitted"
                    ? "warning.dark"
                    : ticket?.appeal === "approved"
                    ? "success.dark"
                    : ticket?.appeal === "rejected"
                    ? "error.dark"
                    : "text.primary",
              }}
            >
              {ticket?.appeal === "submitted"
                ? t("submitted")
                : ticket?.appeal === "approved"
                ? t("approved")
                : ticket?.appeal === "rejected"
                ? t("rejected")
                : ""}
            </Typography>
          </Typography>
    );
  };


  const topHalf = () => {
    return (
      <React.Fragment>
        {ticket ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Alert
              icon={ticket.paid ? <CheckIcon fontSize="inherit" /> : <ErrorIcon fontSize="inherit" />}
              severity={ticket.paid ? "success" : "error"}
              sx = {{ borderRadius: 3}}
            >
              <Box>
              <Typography><strong>Due: </strong> {handleHourDate(ticket.due)}</Typography>
              <Typography><strong>Status: </strong>{ticket.paid ? "Paid" : "Unpaid"}</Typography>
              {appealed && appealedDisplay(ticket)}
              </Box>
            </Alert>

            <CardMedia
              component="img"
              image={`${ticket.image}?w=164&h=164&fit=crop&auto=format`}
              alt="Invalid image"
              loading="lazy"
              style={{ width: "100%", height: "auto" }}
              aria-label={"image_" + ticketId}
              sx = {{ borderRadius: 2, mb: 2}}
            />
            <Typography>
              <strong>{t("violation")} </strong>
              {ticket?.violation}
            </Typography>
            <Typography>
              <strong>{t("description")}</strong> {ticket?.description}
            </Typography>

            <Typography>
              <strong>{t("licensePlate")}</strong> {vehicle?.licensePlate}
            </Typography>

            <Typography>
              <strong>{t("issued")}</strong> {handleHourDate(ticket?.issue)}
            </Typography>

            <Typography>
              <strong>{t("cost")}</strong> ${ticket?.cost}
            </Typography>

          </Box>
        ) : (
          <div>{t("loading")}</div>
        )}
      </React.Fragment>
    );
  };

            {/* pay and appeald button */}
  const bottomHalf = () => {
    return (
      <React.Fragment>
        {ticket ? (
          <Box >
            {!ticket?.paid && ticket?.appeal != "approved" && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 1,
                }}
              >
                <Fab
                  color="primary"
                  variant="extended"
                  onClick={() => {
                    handleClickPaid();
                  }}
                >
                  <CurrencyExchangeIcon sx={{ mr: 1 }} />
                  {t("payTicket")}
                </Fab>

                <Fab
                  color="secondary"
                  variant="extended"
                  onClick={() => {
                    handleOpenAppealModal();
                  }}
                >
                  <FrontHandIcon sx={{ mr: 1 }} />
                  {t("appealTicket")}
                </Fab>
              </Box>
            )}
            <AppealModal
              open={appealModalOpen}
              onClose={handleCloseAppealModal}
              onSubmit={handleSubmitAppeal}
            />
          </Box>
        ) : (
          <div>{t("loading")}</div>
        )}
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      <Box>
        <Grid
          style={{ height: "76vh", overflow: "auto" }}
          size={{ xs: 12, sm: 12, md: 12 }}
        >
          {topHalf()}
        </Grid>
        {bottomHalf()}
      </Box>
    </React.Fragment>
  );
}
