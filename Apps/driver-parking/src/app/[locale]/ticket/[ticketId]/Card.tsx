"use client";
import React, { useEffect, useState } from "react";
import { Ticket } from "@/ticket";
import { getTicketById, setTicketPaid } from "../actions";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import CardMedia from "@mui/material/CardMedia";
import { Box} from "@mui/material";
import Button from "@mui/material/Button";
import { Vehicle } from "@/register";
import { getVehicleById } from "../../register/actions";

export default function Card({ ticketId }: { ticketId: string }) {
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);

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
  const handleClick = async () => {
    console.log('clasldufhjadghadsghas')
    const newTicket = await setTicketPaid(ticketId, true);
    if (newTicket) {
      setTicket(newTicket);
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
            aria-label={"image_" + ticketId}
          />
          <List>
            <ListItemText>Violation: {ticket?.violation}</ListItemText>

            <ListItemText>Description: {ticket?.description}</ListItemText>

            <ListItemText>License Plate: {vehicle?.licensePlate}</ListItemText>

            <ListItemText>Issued: {handleHourDate(ticket?.issue)}</ListItemText>

            <ListItemText>Due: {handleHourDate(ticket?.due)}</ListItemText>

            <ListItemText>Cost: ${ticket?.cost}</ListItemText>

            <ListItemText>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                {ticket?.paid ? "Paid" : "Unpaid"}

                {!ticket?.paid && (
                  <Button variant="outlined" onClick={() => {handleClick()}}>Pay Ticket</Button>
                )}
              </Box>
            </ListItemText>
          </List>
        </Box>
      ) : (
        <div>test</div>
      )}
    </React.Fragment>
  );
}
