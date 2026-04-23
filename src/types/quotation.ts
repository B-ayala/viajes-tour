export type TransportType = 'avion' | 'bus';
export type TripType = 'pasajes' | 'pasajes_hotel';
export type HotelStars = 3 | 4 | 5;

export interface Passengers {
  adults: number;
  children: number;
}

export interface QuotationInput {
  originId: string;
  destinationId: string;
  startDate: string; // ISO yyyy-mm-dd
  endDate: string;
  passengers: Passengers;
  tripType: TripType;
  transport: TransportType;
  hotelStars?: HotelStars;
  activityIds: string[];
}

export interface PriceLine {
  label: string;
  detail?: string;
  amount: number;
}

export interface QuotationResult {
  input: QuotationInput;
  nights: number;
  lines: PriceLine[];
  subtotal: number;
  taxes: number;
  total: number;
  currency: 'PEN';
}

export interface Destination {
  id: string;
  name: string;
  region: string;
  image: string;
  description: string;
  /** Factor multiplicador de precio base (dificultad/demanda) */
  priceFactor: number;
  /** Precio base de avión ida+vuelta por adulto, desde Lima */
  planeBasePEN: number;
  /** Precio base de bus ida+vuelta por adulto, desde Lima */
  busBasePEN: number;
}

export interface Activity {
  id: string;
  name: string;
  destinationId: string;
  pricePEN: number;
  durationHours: number;
  description: string;
}

export interface TravelPackage {
  id: string;
  destinationId: string;
  title: string;
  highlights: string[];
  image: string;
  hotelStars: HotelStars;
  transport: TransportType;
  /** Bonificación/descuento aplicada al total calculado (ej. -0.05 = 5% off) */
  discount: number;
}
