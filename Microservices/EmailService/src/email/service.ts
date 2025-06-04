import FormData from "form-data";
import Mailgun from "mailgun.js";

export async function sendPermitPaymentConfirmation(email: string, name: string, nameOfProduct: string, costOfProduct: number, permitTypeId: string, vehicleId: string) {
  const mailgun = new Mailgun(FormData);
  const mg = mailgun.client({
    username: "api",
    key: process.env.MAILGUN_API_KEY || "API_KEY",
  });

  try {
    const data = await mg.messages.create("virtual-park.net", {
      from: "Virtual Park <noreply@yourdomain.com>", // Use a verified sender
      to: [`${name} <${email}>`],
      subject: "Purchase Confirmation",
      text: `Thank you for your purchase! Here are the details of your transaction.

      Permit: ${nameOfProduct}
      Amount Paid: $${(costOfProduct / 100).toFixed(2)}
      Permit ID: ${permitTypeId}
      Vehicle ID: ${vehicleId}

      If you have any questions or need assistance, please do not hesitate to contact us. 

      Best regards, the Virtual Park Team.
      `,

    });

    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

export async function sendTicketPaymentConfirmation(email: string, name: string, nameOfProduct: string, costOfProduct: number, ticketId: string) {
  const mailgun = new Mailgun(FormData);
  const mg = mailgun.client({
    username: "api",
    key: process.env.MAILGUN_API_KEY || "API_KEY",
  });

  try {
    const data = await mg.messages.create("virtual-park.net", {
      from: "Virtual Park <noreply@yourdomain.com>", // Use a verified sender
      to: [`${name} <${email}>`],
      subject: "Payment Confirmation",
      text: `Thank you for your payment! Here are the details of your transaction:

      Ticket: ${nameOfProduct}
      Amount Paid: $${(costOfProduct / 100).toFixed(2)}
      Ticket ID: ${ticketId}

      If you have any questions or need assistance, please do not hesitate to contact us. 

      Best regards, the Virtual Park Team.
      `,

    });

    console.log(data);
  } catch (error) {
    console.log(error);
  }
}
export async function sendTicketAppealRejected(email: string, name: string, ticketId: string, violation: string) {
  const mailgun = new Mailgun(FormData);
  const mg = mailgun.client({
    username: "api",
    key: process.env.MAILGUN_API_KEY || "API_KEY",
  });

  try {
    const data = await mg.messages.create("virtual-park.net", {
      from: "Virtual Park <noreply@yourdomain.com>", // Use a verified sender
      to: [`${name} <${email}>`],
      subject: "Ticket Appeal Rejection Notice",
      text: `Your appeal for the ticket has been rejected. Here are the details:

      Ticket ID: ${ticketId}
      Ticket Violation: ${violation}

      If you have any questions or need assistance, please do not hesitate to contact us. 

      Best regards, the Virtual Park Team.
      `,

    });

    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

export async function sendTicketAppealAccepted(email: string, name: string, ticketId: string, violation: string) {
  const mailgun = new Mailgun(FormData);
  const mg = mailgun.client({
    username: "api",
    key: process.env.MAILGUN_API_KEY || "API_KEY",
  });

  try {
    const data = await mg.messages.create("virtual-park.net", {
      from: "Virtual Park <noreply@yourdomain.com>", // Use a verified sender
      to: [`${name} <${email}>`],
      subject: "Ticket Appeal Accepted! :D",
      text: `Your appeal for the ticket has been accepted. Here are the details:

      Ticket ID: ${ticketId}
      Ticket Violation: ${violation}

      You can pay the reduced fine at virtual-park.net.

      If you have any questions or need assistance, please do not hesitate to contact us. 

      Best regards, the Virtual Park Team.
      `,

    });

    console.log(data);
  } catch (error) {
    console.log(error);
  }
}