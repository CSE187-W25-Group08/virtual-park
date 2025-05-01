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

  return (

    <Card sx={{ p: 2, border: '1px solid #ccc'}}>
      <div>Violation</div>
      <div>Violation</div>
      {initialVehicles.map((vehicle, index) => (
        <TicketCard key = {index}/>
      ))}
    </Card>
  );
}
