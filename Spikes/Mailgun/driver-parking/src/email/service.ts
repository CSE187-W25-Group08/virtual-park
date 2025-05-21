import FormData from "form-data"; // form-data v4.0.1
import Mailgun from "mailgun.js"; // mailgun.js v11.1.0

export async function sendSimpleMessage() {
  const mailgun = new Mailgun(FormData);
  const mg = mailgun.client({
    username: "api",
    key: process.env.API_KEY || "API_KEY",
    // When you have an EU-domain, you must specify the endpoint:
    // url: "https://api.eu.mailgun.net"
  });
  try {
    const data = await mg.messages.create("sandbox0e7b314eed5e4a60b1de8de6508038bc.mailgun.org", {
      from: "Mailgun Sandbox <postmaster@sandbox0e7b314eed5e4a60b1de8de6508038bc.mailgun.org>",
      to: ["Jennifer Chen <jenchenshb@gmail.com>"],
      subject: "Hello Jennifer Chen",
      text: "Congratulations Jennifer Chen, you just sent an email with Mailgun! You are truly awesome!",
    });

    console.log(data); // logs response data
  } catch (error) {
    console.log(error); //logs any error
  }
}