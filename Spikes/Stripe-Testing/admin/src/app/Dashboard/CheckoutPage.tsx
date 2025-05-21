"use client";

import React, { useEffect, useState } from "react";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import { getClientSecretAction } from "../stripe/action";
import { useRouter } from 'next/navigation';

const CheckoutPage = ({ amount }: { amount: number }) => {




  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage,setErrorMessage] = useState<string>();
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

  const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    if (! stripe || !elements) {
      return;
    }

    //error submission
    const {error: submitError} = await elements.submit();
    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false)
      return;
    }
    // suceed submission
    // confirm params has a return url because of 3d secure which temporarily reroutes
    // wihtout it user is sent to blank page
    const {error} =  await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `http://localhost:3000/payment-success?amount=${amount}`
      }
    });
    if (error) {
      setErrorMessage(error.message);
    } else {
      setLoading(false);
    }
  }

  if (!clientSecret || !stripe || !elements) {
    return <div>Nothing is loaded yet</div>
  }

  return (
    <form onSubmit = {handleSubmit}>
      {clientSecret && <PaymentElement/>}
      {errorMessage && <div>{errorMessage}</div>}

      <button disabled = {!stripe || loading}>Pay</button>
    </form>


  );
};

export default CheckoutPage;
