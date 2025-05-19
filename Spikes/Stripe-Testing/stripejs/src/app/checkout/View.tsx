'use client';


import {
  Box,
  Paper,
  Typography,
} from'@mui/material';
import { loadStripe} from '@stripe/stripe-js';
import { Elements } from "@stripe/react-stripe-js";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY === undefined) {
  throw new Error('Missing STRIPE_PUBLISHABLE_KEY in environment variables');
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);


export default function CheckoutView() {
  const handleCheckout = async () => {
    const stripe = await stripePromise;
    if (stripe) {
      const response = await fetch('/api/checkout-sessions/create', {
        method: 'POST',
      });
      const session = await response.json();
      await stripe.redirectToCheckout({ sessionId: session.id });
    }
  };


  const amount = 2.20
  return (
  <Box sx={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center' }}>
    <Paper  sx={{ padding: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography>User</Typography>
      <Typography>Has requested ${amount}</Typography>
      <button onClick={handleCheckout}>Checkout</button>
    </Paper>


    <Elements stripe={stripePromise}>Test</Elements>



  </Box>
  );


}