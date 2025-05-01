'use client';
import { useEffect, useState } from 'react';
import { Box, Card, Typography, Button, TextField, Switch, FormControlLabel } from '@mui/material';
import TicketCard from './card';


export default function TicketList() {
  const initialVehicles = [
  { id: '123', driver: 'Bob', make: 'Toyota', model: 'Corolla', color: 'silver', license_plate: 'B247KLM' },
  { id: '456', driver: 'Bill', make: 'Honda', model: 'Accord', color: 'black', license_plate: 'F918WZQ' },
  { id: '789', driver: 'John', make: 'Toyota', model: 'Prius', color: 'blue', license_plate: 'T304MNE' },
  { id: '100', driver: 'Pork', make: 'Honda', model: 'Civic', color: 'red', license_plate: 'R682LJD' },
  ];

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
      {initialVehicles.map((vehicle, index) => (
        <TicketCard key = {index}/>
      ))}
      {TableHeader('Unpaid')}
    </Card>
  );
}
