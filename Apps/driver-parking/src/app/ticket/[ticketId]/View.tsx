"use client";
import React, { useEffect, useState } from "react";
import ListItem from '@mui/material/ListItem';
import { Ticket } from "@/ticket";
import { getTicketById } from "../actions";
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import CardMedia from "@mui/material/CardMedia";
import { Box } from "@mui/material";

export default function View({ ticketId }: { ticketId: string }) {
  const [ticket, setTicket] = useState<Ticket | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getTicketById(ticketId);
      if (result) {
        setTicket(result);
      }
    };
    fetchData();
  }, []);
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
      return `Today at ${timeString}`;
    } else if (isYesterday) {
      return `Yesterday at ${timeString}`;
    } else {
      const datePart = dateReceived.toLocaleDateString(undefined, {
        weekday: "long",
        month: "long",
        day: "numeric",
      });
      return `${datePart} at ${timeString}`;
    }
  };

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
          />
        <List>
          <ListItem>
          <ListItemText>{handleHourDate(ticket?.issue)}</ListItemText>
          </ListItem>

          <ListItem>
          <ListItemText>{ticket?.violation}</ListItemText>
          </ListItem>

          <ListItem>
          <ListItemText>{ticket?.paid ? "Paid" : "Unpaid"}</ListItemText>
          </ListItem>
        </List>
        </Box>
      ) : (
        <div>test</div>
      )}
    </React.Fragment>
  );
}
