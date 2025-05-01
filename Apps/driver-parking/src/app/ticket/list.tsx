'use client';
import { useEffect, useState } from 'react';
import { Box, Card, Typography, Button, TextField, Switch, FormControlLabel } from '@mui/material';
import TicketCard from './card';
import { Ticket } from '../../ticket';
import { list } from './actions';


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

    <Card sx={{ p: 2, border: '1px solid #ccc'}}>
      {TableHeader('Paid')}
      {ticketList.map((ticket, index) => (
        <TicketCard key = {index} ticket = {ticket}/>
      ))}
      {TableHeader('Unpaid')}
    </Card>
  );
}
