"use client"
import { Ticket } from '@/ticket';
import {getTicketDetails} from '../action'
import {useState, useEffect} from 'react'
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Chip,
  Box,
  CircularProgress
} from "@mui/material";

export default function TicketInfo({ ticketId }: { ticketId: string }) {
  
    const [ticket, setTicket] = useState<Ticket>();

    useEffect(() => {
      const fetchData = async () => {
        const result = await getTicketDetails(ticketId);
        if (result) {
          setTicket(result);
        }
      };
      fetchData();
  
    }, [ticketId])

    // https://chatgpt.com/c/68224fea-167c-8007-b525-2167c07b5496
    if (!ticket) {
      return (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      );
    }
  
    return (
      <Card sx={{ maxWidth: 800, mx: "auto", mt: 4 }}>
        <CardMedia
          component="img"
          height="300"
          image={ticket.image}
          alt="Violation image"
        />
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Violation: {ticket.violation}
          </Typography>
  
          <Typography variant="body1" color="text.secondary" mb={2}>
            {ticket.description}
          </Typography>
  
          <Grid container spacing={2}>
            <Grid>
              <Typography variant="body2"><strong>Ticket ID:</strong> {ticket.id}</Typography>
              <Typography variant="body2"><strong>Vehicle:</strong> {ticket.vehicle}</Typography>
              <Typography variant="body2"><strong>Enforcer:</strong> {ticket.enforcer}</Typography>
              <Typography variant="body2"><strong>Lot:</strong> {ticket.lot}</Typography>
            </Grid>
            <Grid>
              <Typography variant="body2"><strong>Issued:</strong> {new Date(ticket.issue).toLocaleString()}</Typography>
              <Typography variant="body2"><strong>Due:</strong> {new Date(ticket.due).toLocaleDateString()}</Typography>
              <Typography variant="body2"><strong>Cost:</strong> ${ticket.cost.toFixed(2)}</Typography>
              <Typography variant="body2"><strong>Appeal:</strong> {ticket.appeal}</Typography>
            </Grid>
          </Grid>
  
          <Box mt={2}>
            <Chip
              label={ticket.paid ? "Paid" : "Unpaid"}
              color={ticket.paid ? "success" : "error"}
              variant="outlined"
              sx={{ mr: 1 }}
            />
            <Chip label={`Appeal: ${ticket.appeal}`} variant="outlined" />
          </Box>
        </CardContent>
      </Card>
    );
  }
