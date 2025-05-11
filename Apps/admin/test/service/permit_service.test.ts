import { it, expect, vi} from "vitest";
import { TicketService } from "../../src/ticket/service";
import { Permit } from "../../src/permit";
import { getPermitByDriver } from "../../src/permit/service";

const mockPermits: Permit[] = [
  {
    issueDate: "2025-01-01",
    expDate: "2026-01-01",
    type: "Residential",
    price: 120.00
  },
  {
    issueDate: "2025-03-15",
    expDate: "2025-09-15",
    type: "Visitor",
    price: 30.00
  },
  {
    issueDate: "2024-12-01",
    expDate: "2025-12-01",
    type: "Commercial",
    price: 250.00
  },
];

it("successfully fetches paid tickets from GraphQL API", async () => {
  vi.spyOn(global, "fetch").mockResolvedValueOnce({
    status: 200,
    json: async () => ({
      data: {
        permitsByDriver: mockPermits
      }
    })
  } as Response);

  const result = await getPermitByDriver("dummy");

  expect(result.length).toEqual(3);
});

it("Unauthorized on pay tickets", async () => {
  vi.spyOn(global, "fetch").mockResolvedValueOnce({
    status: 500,
    json: async () => ({
      data: {
        permitsByDriver: mockPermits
      }
    })
  } as Response);

  await expect(getPermitByDriver("dummy")).rejects.toThrow('Unauthorized');
});

