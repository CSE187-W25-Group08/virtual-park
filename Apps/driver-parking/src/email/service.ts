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

export async function sendAppealPaymentConfirmation(email: string, name: string) {
  const mailgun = new Mailgun(FormData);
  const mg = mailgun.client({
    username: "api",
    key: process.env.MAILGUN_API_KEY || "API_KEY",
  });
  try {
    const data = await mg.messages.create("virtual-park.net", {
      from: "Virtual Park <tba@email.com>",
      to: [`${name} <${email}>`],
      subject: "Payment Confirmation",
      text: `You have submitted an appeal. An admin will view the appeal and determine if it is qualified for our reduced cost.
      You still have to pay for a little bit. L+ ratio.
      `

    });

    console.log(data); // logs response data
  } catch (error) {
    console.log(error); //logs any error
  }
}