'use client';


import {
  Box,
} from'@mui/material';
import { loadStripe, Stripe } from '@stripe/stripe-js';

const publicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const stripePromise: Promise<Stripe | null> = publicKey
  ? loadStripe(publicKey)
  : Promise.resolve(null);


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
  return (
  <Box sx={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center' }}>
    <button onClick={handleCheckout}>Checkout</button>
  </Box>
  );


}