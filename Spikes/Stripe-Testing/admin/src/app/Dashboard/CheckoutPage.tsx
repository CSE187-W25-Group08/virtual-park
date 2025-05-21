"use client";

import React, { useEffect, useState } from "react";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import { getClientSecretAction } from "../stripe/action";

const CheckoutPage = ({ amount }: { amount: number }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);

  const convertToSubCurrency = (amount: number, factor = 100) => {
    return Math.round(amount * factor);
  };

  // payment session resets after changing amount
  useEffect(() => {
      const setClient = async () => {

        const amountToCents = convertToSubCurrency(amount)
        const client = await getClientSecretAction(amountToCents);
        if (client) {
          setClientSecret(client)
        }
    };

    setClient()

  }, [amount]);

  return (
    <div>
      {clientSecret && <PaymentElement/>}
    </div>
  );
};

export default CheckoutPage;
