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
    const issueDate = new Date(ticket.issue);
    const dueDate = new Date(ticket.due);
    const data = await mg.messages.create("virtual-park.net", {
      from: "Virtual Park Enforcement <postmaster@virtual-park.net>",
      to: [`${name} <${email}>`],
      subject: "New Ticket",
      text: `You have been issued a new ticket:\n
      Description: ${ticket.description}\n
      Violation: ${ticket.violation}\n
      Issue Date: ${issueDate}\n
      Due Date: ${dueDate}\n
      Cost: $${ticket.cost}\n
      Please log in to your account to view more details.`,
    });

    console.log(data); // logs response data
  } catch (error) {
    console.log(error); //logs any error
  }
}