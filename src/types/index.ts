export type TTicket = {
  ticketId: number;
  eventId: number;
  seatDetails: {
    seatNumber: number;
    row?: number;
    section?: string;
  };
};
