import FormData from "form-data";
import Mailgun from "mailgun.js";

export async function sendPermitPaymentConfirmation(email: string, name: string, nameOfProduct: string, costOfProduct: number, metadata: Record<string, unknown>) {
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
      text: `Thank you for your purchase! Here are the details of your transaction. Enjoy your parking permit while it lasts:

      Permit: ${nameOfProduct}
      Amount Paid: $${(costOfProduct / 100).toFixed(2)}
      Permit ID: ${metadata.permitTypeId}
      Vehicle ID: ${metadata.vehicleId}

      If you have any questions or need assistance, please do not contact us. 

      Best regards, the Virtualest of Parkest Virual Parketh eth doth Virtual Parketh Team.
      `,

    });

    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

export async function sendTicketPaymentConfirmation(email: string, name: string, nameOfProduct: string, costOfProduct: number, metadata: Record<string, unknown>) {
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
      text: `Thank you for your purchase! Here are the details of your transaction:

      Ticket: ${nameOfProduct}
      Amount Paid: $${(costOfProduct / 100).toFixed(2)}
      Ticket ID: ${metadata.id}

      If you have any questions or need assistance, please do not contact us. 

      Best regards, the Virtualest of Parkest Virual Parketh eth doth Virtual Parketh Team.
      `,

    });

    console.log(data);
  } catch (error) {
    console.log(error);
  }
}