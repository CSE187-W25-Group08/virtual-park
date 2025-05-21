"use client"
// https://www.youtube.com/watch?v=fgbEwVWlpsI guide i followed

import {
  Box,
  Typography,
} from'@mui/material'


import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";
import CheckoutPage from './CheckoutPage';


const nextPubKey = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY;
if (!nextPubKey) {
  throw Error()
}
const stripePromise = loadStripe(nextPubKey)
export default function DashBoardView() {

  const convertToSubCurrency = (amount : number, factor=100) => {
     return Math.round(amount * factor);
  }

  const amount = 49.99;
  return (
    <Box sx={{ minHeight: '100vh' }}>
      <Typography>Sonny</Typography>
      <Typography>has requested</Typography>
      <Typography>{amount}</Typography>


      <Elements stripe = {stripePromise}
        options = {{
          mode: "payment", 
          amount : convertToSubCurrency(amount), // will be cents
          currency: "usd",
        }}
      
      
      >
        <CheckoutPage amount = {amount}/>






      </Elements>
    </Box>
  )
}