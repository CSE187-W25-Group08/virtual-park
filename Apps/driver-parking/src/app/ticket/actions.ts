"use server";

import { cookies } from "next/headers";

import { Ticket } from "../../ticket";
import { decrypt } from "../../auth/jwtAuth";

export async function list(): Promise<Ticket[] | undefined> {
  try {
    const cookie = (await cookies()).get("session")?.value;
    const userId = await decrypt(cookie);
    // query for microservice action goes here
    console.log(userId);

    const ticketList = [
      {
        id: "t1",
        vehicle: "ABC1234",
        enforcer: "E123",
        lot: "Lot A",
        status: "unpaid",
        description: "Parked in a no-parking zone",
        due: "2025-05-15T23:59:59Z",
        issue: "2025-05-01T10:30:00Z",
        violation: "No Parking Zone",
        image: "/images/tickets/t1.jpg",
      },
      {
        id: "t2",
        vehicle: "XYZ5678",
        enforcer: "E456",
        lot: "Lot B",
        status: "paid",
        description: "Expired meter",
        due: "2025-04-28T23:59:59Z",
        issue: "2025-04-25T09:00:00Z",
        violation: "Expired Meter",
        image: "/images/tickets/t2.jpg",
      },
    ];

    return ticketList;
  } catch {
    return [];
  }
}
