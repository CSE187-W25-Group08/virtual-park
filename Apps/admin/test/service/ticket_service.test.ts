import { it, expect, vi} from "vitest";
import { TicketService } from "../../src/ticket/service";
import { Ticket } from "../../src/ticket";

const mockTickets: Ticket[] = [
  {
    id: "abc123",
    vehicle: "8XYZ123",
    enforcer: "officer_42",
    lot: "Lot A",
    paid: true,
    description: "Parked in a no-parking zone near hydrant.",
    due: "2025-06-10T23:59:59Z",
    issue: "2025-05-05T14:30:00Z",
    violation: "No Parking Zone",
    image: "https://example.com/images/ticket_abc123.jpg",
    cost: 75,
    appeal: "Under review for hydrant visibility dispute."
  },
  {
    id: "def456",
    vehicle: "7ABC456",
    enforcer: "officer_17",
    lot: "Lot B",
    paid: true,
    description: "Expired meter violation.",
    due: "2025-05-20T23:59:59Z",
    issue: "2025-05-01T09:15:00Z",
    violation: "Expired Meter",
    image: "https://example.com/images/ticket_def456.jpg",
    cost: 45,
    appeal: ""
  },
  {
    id: "ghi789",
    vehicle: "9LMN789",
    enforcer: "officer_33",
    lot: "Lot C",
    paid: true,
    description: "Parked in a reserved spot without permit.",
    due: "2025-06-01T23:59:59Z",
    issue: "2025-05-07T16:45:00Z",
    violation: "Unauthorized Parking",
    image: "https://example.com/images/ticket_ghi789.jpg",
    cost: 100,
    appeal: "Submitted proof of valid permit."
  }
];

it("successfully fetches all tickets from GraphQL API", async () => {
  vi.spyOn(global, "fetch").mockResolvedValueOnce({
    status: 200,
    json: async () => ({
      data: {
        allTicket: mockTickets
      }
    })
  } as Response);

  const result = await new TicketService().getAllTicket("dummy");

  expect(result.length).toEqual(3);
  expect(result[0].id).toEqual("abc123");
});

it("Unauthorized on pay tickets", async () => {
  vi.spyOn(global, "fetch").mockResolvedValueOnce({
    status: 500,
    json: async () => ({
      data: {
        allTicket: mockTickets
      }
    })
  } as Response);

  await expect(new TicketService().getAllTicket("dummy")).rejects.toThrow('Unauthorized');
});

