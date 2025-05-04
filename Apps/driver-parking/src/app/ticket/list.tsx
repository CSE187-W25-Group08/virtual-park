"use client";
import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import TicketCard from "./card";
import { Ticket } from "../../ticket";
import { listPaid, listUnpaid } from "./actions";
import List from "@mui/material/List";

export default function TicketList() {
  const [paidTicketList, setPaidTicketList] = useState<Ticket[]>([]);
  const [unpaidTicket, setUnpaidTicket] = useState<Ticket[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const resultPaid = await listPaid();
      const resultUnpaid = await listUnpaid();
      if (resultPaid) {
        setPaidTicketList(resultPaid);
      }
      if (resultUnpaid) {
        setUnpaidTicket(resultUnpaid);
      }
    };
    fetchData();
  }, []);

  const TableHeader = (title: string) => (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <Typography>Violation</Typography>
      <Typography>{title}</Typography>
      <Box>
        <Typography>Deductible</Typography>
        <Typography>Issue Date</Typography>
      </Box>
    </Box>
  );

  return (
    <List>
      {TableHeader("Unpaid")}
      {unpaidTicket.map((ticket, index) => (
        <TicketCard key={index} ticket={ticket} />
      ))}
      {TableHeader("Paid")}
      {paidTicketList.map((ticket, index) => (
        <TicketCard key={index} ticket={ticket} />
      ))}
    </List>
  );
}
