export type Ticket = {
  price: number;
  carrier: string;
  segments: FlightDetails[];
};

export type FlightDetails = {
  origin: string;
  destination: string;
  date: string;
  stops: string[];
  duration: number;
};

export type SortResult = {
  index: number;
  value: number;
  stops: number;
};