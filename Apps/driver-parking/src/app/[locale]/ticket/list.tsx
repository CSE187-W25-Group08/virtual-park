"use client";
import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import List from "@mui/material/List";
import { useTranslations } from "next-intl";

import TicketCard from "./card";
import { Ticket } from "../../../ticket";
import { listPaid, listUnpaid, listAppealed } from "./actions";


export default function TicketList() {
  const [paidTicketList, setPaidTicketList] = useState<Ticket[]>([]);
  const [unpaidTicket, setUnpaidTicket] = useState<Ticket[]>([]);
  const [appealedTickets, setAppealedTickets] = useState<Ticket[]>([]);
  const t = useTranslations("ticket");

  useEffect(() => {
    const fetchData = async () => {
      const resultPaid = await listPaid();
      const resultUnpaid = await listUnpaid();
      const resultAppealed = await listAppealed();
      if (resultPaid) {
        setPaidTicketList(resultPaid);
      }
      if (resultUnpaid) {
        setUnpaidTicket(resultUnpaid);
      }
      if (resultAppealed) {
        setAppealedTickets(resultAppealed);
      }
    };
    fetchData();
  }, []);

  const TableHeader = (title: string, type: string) => (
    <Box
      sx={{
        mt: 1,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <Typography>{title}</Typography>
      <Box>
      {type === "unpaid" ? (
        <Typography>{t('issueDate')}</Typography>
      ) : type === "paid" ? (
        <Typography>{t('datePaid')}</Typography>
      ) : (
        <Typography>{t('status')}</Typography>
      )}
      </Box>
    </Box>
  );

  return (
    <>
      {/* <AppBar>
        <Toolbar>
          <Typography>Tickets</Typography>
        </Toolbar>
      </AppBar> */}
      <Box sx={{ px: 2 }}>
        <List sx={{ width: '100%' }}>
          {unpaidTicket.length <= 0 ?
            <Typography sx={{mt: 7}}>{t('noTickets')}</Typography> : (
            <>
              {TableHeader(t('unpaid'), "unpaid")}
              {unpaidTicket.map((ticket, index) => (
                <TicketCard key={index} ticket={ticket} />
              ))}
            </>
          )}

          {paidTicketList.length > 0 && (
            <>
              {TableHeader(t('paid'), "paid")}
              {paidTicketList.map((ticket, index) => (
                <TicketCard key={index} ticket={ticket} />
              ))}
            </>
          )}

          {appealedTickets.length > 0 && (
            <>
              {TableHeader(t('appeal'), "appeal")}
              {appealedTickets.map((ticket, index) => (
                <TicketCard key={index} ticket={ticket} />
              ))}
            </>
          )}
        </List>
      </Box>
    </>
  );
}
