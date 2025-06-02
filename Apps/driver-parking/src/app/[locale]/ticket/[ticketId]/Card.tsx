"use client";
import React, { useEffect, useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import ErrorIcon from '@mui/icons-material/Error';
import CardMedia from "@mui/material/CardMedia";
import { Box, Typography, Alert, Card, Button, CardActions } from "@mui/material";
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
import { UserInfo } from "../../../../auth";
import { getUserInfoAction } from "../../login/action";
import { sendAppealPaymentConfirmation } from "../../../../email/service";

export default function TicketCard({ ticketId }: { ticketId: string }) {
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [appealModalOpen, setAppealModalOpen] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

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


      const result2 = await getUserInfoAction();
      if (result2) {
        setUserInfo(result2)
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
      await sendAppealPaymentConfirmation(userInfo!.email, userInfo!.name)

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
              sx={{ width: "95%", height: "auto", mx: "auto", borderRadius: 2, mb: 2, mt: 2 }}
              aria-label={"image_" + ticketId}
            />
            <Box sx={{ mx: 3 }}>
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
            {!ticket?.paid && (
              <Box>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => {
                    handleClickPaid();
                  }}
                  sx={{ borderRadius: 4, mr: 1 }}
                >
                  <CurrencyExchangeIcon sx={{ mr: 1 }} />
                  {t("payTicket")}
                </Button>
                { ticket?.appeal === "null" && (
                  <Button
                    color="secondary"
                    variant="contained"
                    onClick={() => {
                      handleOpenAppealModal();
                    }}
                    sx={{ borderRadius: 4 }}
                  >
                    <FrontHandIcon sx={{ mr: 1 }} />
                    {t("appealTicket")}
                  </Button>
                )}
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
      <Card sx = {{
        width: { xs: "100%", sm: "400px" },
        mx: "auto",
        borderRadius: 4,
        height: "auto",
        mb: {xs: "64px", sm: 0},
        mt: {xs: 0, sm: 1},
        overflow: "auto",
        '&::-webkit-scrollbar': { display: 'none' },
        }} raised>
        {topHalf()}
        <CardActions sx={{ justifyContent: "center", alignItems: "center" }}>
          {bottomHalf()}
        </CardActions>
      </Card>
    </React.Fragment>
  );
}
