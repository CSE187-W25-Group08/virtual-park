"use client";

import React, { useEffect, useState } from "react";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";

const CheckoutPage = ({ amount }: { amount: number }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);

  const convertToSubCurrency = (amount: number, factor = 100) => {
    return Math.round(amount * factor);
  };

  // payment session
  useEffect(() => {
    fetch("../api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: convertToSubCurrency(amount) }),
    }).then((res) => res.json())
    .then((data) => setClientSecret(data.clientSecret));
  }, [amount]);

  return (
    <div>
      {clientSecret && <PaymentElement/>}
    </div>
  );
};

export default CheckoutPage;
