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

export type FiltersObject = {
  Все: boolean;
  'Без пересадок': boolean;
  '1 пересадка': boolean;
  '2 пересадки': boolean;
  '3 пересадки': boolean;
};
