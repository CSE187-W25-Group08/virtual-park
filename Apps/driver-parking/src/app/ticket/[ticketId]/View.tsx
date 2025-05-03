"use client";
import React, { useEffect, useState } from "react";
import ListItem from '@mui/material/ListItem';
import { Ticket } from "@/ticket";
import { getTicketById } from "../actions";
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';

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

  return (
    <React.Fragment>
      {ticket ? (
        <List>
          <ListItem>
          <ListItemText>{ticket?.id}</ListItemText>
          </ListItem>
          <ListItemText>{ticket?.violation}</ListItemText>
          <ListItemText>{ticket?.paid ? "Paid" : "Unpaid"}</ListItemText>
        </List>
      ) : (
        <div>test</div>
      )}
    </React.Fragment>
  );
}
