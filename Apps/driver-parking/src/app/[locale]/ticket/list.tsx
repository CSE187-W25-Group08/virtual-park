"use client";
import React, { useEffect, useState } from "react";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import TicketCard from "./card";
import { Ticket } from "../../../ticket";
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

  const TableHeader = (title: string, type: string) => (
    <Box
      sx={{
        mt: 7,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      {/* <Typography>Violation</Typography> */}
      <Typography>{title}</Typography>
      <Box>
        {/* <Typography>Deductible</Typography> */}
        {type == "unpaid" ? 
        (<Typography>Issue Date</Typography>) :
        (<Typography>Date Paid</Typography>)}
      </Box>
    </Box>
  );

  return (
    <>
      <AppBar>
        <Toolbar>
          <Typography>Tickets</Typography>
        </Toolbar>
      </AppBar>
      
      <Box sx={{ px: 2 }}>
        <List sx={{ width: '100%' }}>
          {unpaidTicket.length <= 0 ?
          <Typography sx={{mt: 7}}>No current violations on file.</Typography> : (
            <>
              {TableHeader("🔴 Unpaid Violations", "unpaid")}
              {unpaidTicket.map((ticket, index) => (
                <TicketCard key={index} ticket={ticket} />
              ))}
            </>
          )}

          {paidTicketList.length > 0 && (
            <>
              {TableHeader("✅ Paid Violations", "paid")}
              {paidTicketList.map((ticket, index) => (
                <TicketCard key={index} ticket={ticket} />
              ))}
            </>
          )}
        </List>
      </Box>
    </>
  );
}
