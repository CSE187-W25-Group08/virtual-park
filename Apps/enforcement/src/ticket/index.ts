export interface Ticket {
  id: string,
  vehicle: string | '',
  enforcer: string,
  lot: string,
  paid: boolean,
  description: string,
  due: string,
  issue: string,
  violation: string,
  image: string,
  cost: number,
  appeal: string,
  appealReason: string
}

export interface TicketInfo {
driverID: string | '';
vehicleID: string | '';
lot: string;
description: string;
violation: string;
image: string;
cost: number;
}

export interface TicketViewProps {
open: boolean;
close: () => void;
driverID: string | '';
vehicleID: string | '';
success: (ticketId: string) => void;
error: (errorMessage: string) => void;
LotName: string;
LotID: string | '';
ticketPrice: number;
}