import FormData from "form-data";
import Mailgun from "mailgun.js";

export async function sendPermitPurchaseConfirmation(email: string, name: string) {
  const mailgun = new Mailgun(FormData);
  const mg = mailgun.client({
    username: "api",
    key: process.env.MAILGUN_API_KEY || "API_KEY",
  });
  try {
    const data = await mg.messages.create("tba@email.com", {
      from: "Virtual Park <tba@email.com>",
      to: [`${name} <${email}>`],
      subject: "Purchase Confirmation",
      text: "Thank you for your purchase! Here are the details of your transaction:",
    });

    console.log(data); // logs response data
  } catch (error) {
    console.log(error); //logs any error
  }
}

export async function sendTicketPaymentConfirmation(email: string, name: string) {
  const mailgun = new Mailgun(FormData);
  const mg = mailgun.client({
    username: "api",
    key: process.env.API_KEY || "API_KEY",
  });
  try {
    const data = await mg.messages.create("tba@email.com", {
      from: "Virtual Park <tba@email.com>",
      to: [`${name} <${email}>`],
      subject: "Payment Confirmation",
      text: "Thank you for your payment! Here are the details of your transaction:",
    });

    console.log(data); // logs response data
  } catch (error) {
    console.log(error); //logs any error
  }
}