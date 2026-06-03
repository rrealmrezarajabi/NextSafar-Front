export interface TicketPassenger {
  first_name: string;
  last_name: string;
  national_code: string;
}

export interface TicketTrip {
  id: number;
  origin_city: string;
  destination_city: string;
  departure: string;
  arrival: string;
}

export interface Ticket {
  id: number;
  booking_id: number;
  passenger: TicketPassenger;
  trip: TicketTrip;
  seat_number: number;
  ticket_code: string;
  issued_at: string;
}
