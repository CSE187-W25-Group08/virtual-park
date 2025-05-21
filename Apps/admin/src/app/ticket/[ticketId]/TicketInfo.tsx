"use client"
import { Ticket } from '@/ticket';
import {getTicketDetails,
   approveAppeal,
    rejectAppeal
  } from '../action'
import {useState, useEffect} from 'react'
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Chip,
  Box,
  CircularProgress,
  Button
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

    const handleApproveAppeal = async (ticektId : string) => {
      const new_ticket = await approveAppeal(ticektId);
      if (new_ticket) {
        setTicket(new_ticket);
      }
    }

    const handleRejectAppeal = async (ticektId : string) => {
      const new_ticket = await rejectAppeal(ticektId);
      if (new_ticket) {
        setTicket(new_ticket);
      }
    }

    // https://chatgpt.com/c/68224fea-167c-8007-b525-2167c07b5496
    const getAppealChipColor = (appeal: string | null) => {
      switch (appeal) {
        case "submitted":
          return "warning";
        case "approved":
          return "success";
        case "rejected":
          return "error";
        default:
          return "default";
      }
    };
    // https://chatgpt.com/c/68224fea-167c-8007-b525-2167c07b5496
    if (!ticket) {
      return (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      );
    }
  
    return (
      <>
        <Card sx={{ maxWidth: '60%', mx: "auto", mt: 4, p:3}}>
          <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          px={3}
          py={2}
          borderBottom="1px solid #eee"
        >
          <Typography variant="h4">
            License Plate: {ticket.vehicle}
          </Typography>
          <Box>
          <Chip
            label={`Appeal: ${!ticket.appeal || ticket.appeal == "null" ? "None" : ticket.appeal}`}
            variant="filled"
            color={getAppealChipColor(ticket.appeal)}
            sx={{ fontSize: '1rem', px: 2, py: 1, mr: 2}}
          />
          <Chip
            label={ticket.paid ? "Paid" : "Unpaid"}
            color={ticket.paid ? "success" : "error"}
            variant="filled"
            sx={{ fontSize: '1rem', px: 2, py: 1 }}
          />
          </Box>
        </Box>
          <CardMedia
            component="img"
            height="300"
            image={ticket.image}
            alt="Violation image"
          />
          <CardContent sx={{p:5}}>
            <Typography variant="h4" gutterBottom>
              Violation: {ticket.violation}
            </Typography>
    
            <Typography variant="h6" color="text.secondary" mb={2}>
              {ticket.description}
            </Typography>
    
            <Grid container spacing={5}>
              <Grid>
              <Typography variant="h6"><strong>Issued:</strong> {new Date(ticket.issue).toLocaleString()}</Typography>
                <Typography variant="h6"><strong>Lot:</strong> {ticket.lot}</Typography>
              </Grid>
              <Grid>
                <Typography variant="h6"><strong>Due By:</strong> {new Date(ticket.due).toLocaleDateString()}</Typography>
                <Typography variant="h6"><strong>Amount Due:</strong> ${ticket.cost}</Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        {ticket.appeal && (
          <Box
            sx={{
              maxWidth: '60%',
              mx: 'auto',
              mt: 3,
              p: 3,
              border: '1px solid #ccc',
              borderRadius: 2,
              backgroundColor: '#fafafa',
            }}
          >
            <Typography variant="h6" gutterBottom>
              Appeal Reason:
            </Typography>
            <Typography variant="body1" mb={2}>
              {ticket.appealReason}
            </Typography>

            {ticket.appeal === "submitted" && (
              <Box display="flex" gap={2}>
                <Button variant="contained" color="success" onClick={() => handleApproveAppeal(ticket.id)}>
                  Approve Appeal
                </Button>
                <Button variant="outlined" color="error" onClick={() => handleRejectAppeal(ticket.id)}>
                  Reject Appeal
                </Button>
              </Box>
            )}
          </Box>
        )}
      </>
    );
  }
