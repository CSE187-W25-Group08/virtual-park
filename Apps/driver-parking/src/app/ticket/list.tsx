'use client';
import React, { useEffect, useState } from 'react';
import { Box, Card, Typography} from '@mui/material';
import ListItem from '@mui/material/ListItem';
import TicketCard from './card';
import { Ticket } from '../../ticket';
import { list } from './actions';
import List from '@mui/material/List';


export default function TicketList() {
  const [ticketList, setTicketList] = useState<Ticket[]>([]);

  useEffect(() => {
  const fetchData = async () => {
    const result = await list();
    if (result) {
      setTicketList(result);
    }
  };
  fetchData();

  }, []);

  const TableHeader= (title: string) => (
    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
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

        {TableHeader('Unpaid')}
      {ticketList.map((ticket, index) => (
        <TicketCard key = {index} ticket = {ticket}/>
      ))}
      {TableHeader('Paid')}
    </List>
  );
}
