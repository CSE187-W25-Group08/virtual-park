"use client";
import React, { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import CardMedia from "@mui/material/CardMedia";
import { Box, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import { useRouter } from 'next/navigation'
import { useTranslations } from "next-intl";

import { Ticket } from "@/ticket";
import {
    getTicketById,
    // setTicketPaid,
    setTicketAppealed
  } from "../actions";
import { Vehicle } from "@/register";
import { getVehicleById } from "../../register/actions";

export default function Card({ ticketId }: { ticketId: string }) {
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const t = useTranslations("ticket_details");
  const router = useRouter()

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
      return `${t('today')} ${timeString}`;
    } else if (isYesterday) {
      return `${t('yesterday')} ${timeString}`;
    } else {
      const datePart = dateReceived.toLocaleDateString(undefined, {
        weekday: "long",
        month: "long",
        day: "numeric",
      });
      return `${datePart} at ${timeString}`;
    }
  };

  /*
  const handleClickPaid = async () => {
     const newTicket = await setTicketPaid(ticketId, true);
     if (newTicket) {
       setTicket(newTicket);
       router.push('/ticket');
     }
   };
   */

  const handleClickAppeal = async () => {
    const appealedTicket = await setTicketAppealed(ticketId, 'submitted', '')
     if (appealedTicket) {
       setTicket(appealedTicket)
       router.push('/ticket')
     }
  }

  const appealed = ticket?.appeal != "null"

  const appealedDisplay = (ticket: Ticket) => {

    return (
      <ListItemText
  primary={
    <Typography>
      {t('appealStatus')}&nbsp;
      <Typography
        component="span"
        sx={{
          color:
            ticket?.appeal === "submitted"
              ? "warning.dark"
              : ticket?.appeal === "approved"
              ? "success.dark"
              : ticket?.appeal === "rejected"
              ? "red"
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
  }
/>

    )
  }

  return (
    <React.Fragment>
      {ticket ? (
        <Box>
          <CardMedia
            component="img"
            image={`${ticket.image}?w=164&h=164&fit=crop&auto=format`}
            alt="Invalid image"
            loading="lazy"
            style={{ width: "100%", height: "auto" }}
            aria-label={"image_" + ticketId}
          />
          <List>
            <ListItemText>{t('violation')} {ticket?.violation}</ListItemText>

            <ListItemText>{t('description')} {ticket?.description}</ListItemText>

            <ListItemText>{t('licensePlate')} {vehicle?.licensePlate}</ListItemText>

            <ListItemText>{t('issued')} {handleHourDate(ticket?.issue)}</ListItemText>

            <ListItemText>{t('due')} {handleHourDate(ticket?.due)}</ListItemText>

            <ListItemText>{t('cost')} ${ticket?.cost}</ListItemText>

            {appealed && appealedDisplay(ticket)}


            <ListItemText>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                {ticket?.paid ? 
                <Typography color='success.dark'>{t('paid')}</Typography> : 
                <Typography color='red'>{t('unpaid')}</Typography>}
  
                {(!ticket?.paid && ticket?.appeal != "approved") && (
                  <Box sx={{display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 1}}>
                    {/*<Button variant="outlined" onClick={() => {handleClickPaid()}}>{t('payTicket')}</Button>*/}
                    <Button variant="outlined" onClick={() => {handleClickAppeal()}}>{t('appealTicket')}</Button>
                  </Box>
                )} 
              </Box>
            </ListItemText>
          </List>
        </Box>
      ) : (
        <div>{t('loading')}</div>
      )}
    </React.Fragment>
  );
}
