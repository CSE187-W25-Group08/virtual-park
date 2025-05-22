"use client";
import React from "react";
import { AppBar, Box, Toolbar, Typography, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/navigation";
// import { useTranslations } from "next-intl";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutCard from "./PaymentCard";

import { useSearchParams } from "next/navigation";

const nextPubKey = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY;
if (!nextPubKey) {
  throw Error();
}
const stripePromise = loadStripe(nextPubKey);
export default function View({ permitType }: { permitType: string }) {
  const convertToSubCurrency = (amount: number, factor = 100) => {
    return Math.round(amount * factor);
  };

  const searchParams = useSearchParams();
  const price = parseFloat(searchParams.get("price") || "0");

  const router = useRouter();
  //const t = useTranslations("ticket_details");

  const handleBack = () => {
    router.push("/permit/purchase");
    window.scrollTo(0, 0);
  };

  return (
    <React.Fragment>
      <AppBar>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="back"
            onClick={handleBack}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography>test</Typography>
        </Toolbar>
      </AppBar>

      <Box sx={{ mt: 8, px: 2 }}>
        <Typography>{permitType}</Typography>
        <Typography>${price}</Typography>
        <Elements
          stripe={stripePromise}
          options={{
            mode: "payment",
            amount: convertToSubCurrency(price), // will be cents
            currency: "usd",
          }}
        >
          <CheckoutCard amount={price} />
        </Elements>
      </Box>
    </React.Fragment>
  );
}
