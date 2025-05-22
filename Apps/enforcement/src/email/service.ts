import FormData from "form-data";
import Mailgun from "mailgun.js";

import { Ticket } from "../ticket";

export async function sendTicketNotification(email: string, name: string, ticket: Ticket) {
  const mailgun = new Mailgun(FormData);
  const mg = mailgun.client({
    username: "api",
    key: process.env.MAILGUN_API_KEY || "API_KEY",
  });
  try {
    const data = await mg.messages.create("tba@email.com", {
      from: "Virtual Park <tba@email.com>",
      to: [`${name} <${email}>`],
      subject: "New Ticket",
      text: `You have been issued a new ticket. Here are the details:\n
      Lot: ${ticket.lot}\n
      Vehicle: ${ticket.vehicle}\n
      Description: ${ticket.description}\n
      Violation: ${ticket.violation}\n
      Issue Date: ${ticket.issue}\n
      Due Date: ${ticket.due}\n
      Cost: ${ticket.cost}\n
      Please log in to your account to view more details.`,
    });

    console.log(data); // logs response data
  } catch (error) {
    console.log(error); //logs any error
  }
}