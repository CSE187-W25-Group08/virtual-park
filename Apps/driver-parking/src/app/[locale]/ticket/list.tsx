"use client";
import React, { useEffect, useState } from "react";
import { CircularProgress , Box, Typography } from "@mui/material";
import List from "@mui/material/List";
import { useTranslations } from "next-intl";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import GavelIcon from '@mui/icons-material/Gavel';
import TicketCard from "./card";
import { Ticket } from "../../../ticket";
import { listPaid, listUnpaid, listAppealed } from "./actions";

export default function TicketList() {
  const [paidTicketList, setPaidTicketList] = useState<Ticket[]>([]);
  const [unpaidTicket, setUnpaidTicket] = useState<Ticket[]>([]);
  const [appealedTickets, setAppealedTickets] = useState<Ticket[]>([]);
  const [dataFetched, setDataFeteched] = useState(false);
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
      setDataFeteched(true);
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
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
        {type === "unpaid" && <ErrorOutlineIcon color="error" />}
        {type === "appeal" && <GavelIcon color="warning" />}
        {type === "paid" && <CheckCircleOutlineIcon color="success" />}
        <Typography variant="h5">
          {title}
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ px: 2, mb: 10}}>
      <List sx={{ width: "100%", display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
        {(!dataFetched) && <CircularProgress sx = {{mt: 3}} color="success" />}
        {(dataFetched && unpaidTicket.length <= 0 && appealedTickets.length <= 0 && paidTicketList.length <= 0) && (
            <Box sx={{ display: "flex", width: "100%", justifyContent: "center" }}>
              <Typography sx={{ mt: 7 }}>{t("noTickets")}</Typography>
            </Box>
          )}

        {(unpaidTicket.length > 0) &&  
          <>
            {TableHeader(t("unpaid"), "unpaid")}
            {unpaidTicket.map((ticket, index) => (
              <TicketCard key={index} ticket={ticket} />
            ))}
          </>}
        {appealedTickets.length > 0 && (
          <>
            {TableHeader(t("appeal"), "appeal")}
            {appealedTickets.map((ticket, index) => (
              <TicketCard key={index} ticket={ticket} />
            ))}
          </>
          )}
        
        {paidTicketList.length > 0 && (
          <>
            {TableHeader(t("paid"), "paid")}
            {paidTicketList.map((ticket, index) => (
              <TicketCard key={index} ticket={ticket} />
            ))}
          </>
        )}
      </List>
    </Box>
  );
}
