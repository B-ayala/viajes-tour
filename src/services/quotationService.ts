import type {
  PriceLine,
  QuotationInput,
  QuotationResult,
  TransportType,
  Destination,
} from '@/types';
import { getDestination } from '@/data/destinations';
import { ACTIVITIES } from '@/data/activities';
import { diffNights } from '@/utils/formatters';
import {
  CHILD_ACTIVITY_DISCOUNT,
  CHILD_TRANSPORT_DISCOUNT,
  HOTEL_RATE_PER_NIGHT,
  TAX_RATE,
  getSeasonFactor,
  roomsNeeded,
} from './pricing';

export class QuotationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'QuotationError';
  }
}

const transportUnitPrice = (dest: Destination, transport: TransportType): number => {
  const base = transport === 'avion' ? dest.planeBasePEN : dest.busBasePEN;
  if (base === 0) {
    throw new QuotationError(
      `No hay ${transport === 'avion' ? 'vuelos' : 'buses'} directos a ${dest.name}.`,
    );
  }
  return base * dest.priceFactor;
};

/**
 * Calcula la cotización de un viaje.
 * Pura. Sin side-effects. Testeable.
 */
export const quote = (input: QuotationInput): QuotationResult => {
  const dest = getDestination(input.destinationId);
  if (!dest) throw new QuotationError('Destino no encontrado.');

  const nights = diffNights(input.startDate, input.endDate);
  if (nights < 1) throw new QuotationError('Las fechas deben cubrir al menos 1 noche.');

  const { adults, children } = input.passengers;
  if (adults < 1) throw new QuotationError('Debe haber al menos 1 adulto.');

  const seasonFactor = getSeasonFactor(input.startDate);
  const lines: PriceLine[] = [];

  // ---- Transporte ----
  const unitTransport = transportUnitPrice(dest, input.transport) * seasonFactor;
  const transportAdults = unitTransport * adults;
  const transportChildren = unitTransport * (1 - CHILD_TRANSPORT_DISCOUNT) * children;
  const transportTotal = transportAdults + transportChildren;

  lines.push({
    label: input.transport === 'avion' ? 'Pasajes aéreos' : 'Pasajes en bus',
    detail: `${adults} adulto${adults > 1 ? 's' : ''}${
      children > 0 ? ` + ${children} niño${children > 1 ? 's' : ''} (−50%)` : ''
    }`,
    amount: round(transportTotal),
  });

  // ---- Hotel ----
  if (input.tripType === 'pasajes_hotel') {
    if (!input.hotelStars) throw new QuotationError('Falta tipo de hotel.');
    const rooms = roomsNeeded(adults, children);
    const rate = HOTEL_RATE_PER_NIGHT[input.hotelStars] * seasonFactor;
    const hotelTotal = rate * rooms * nights;

    lines.push({
      label: `Hotel ${input.hotelStars}★`,
      detail: `${rooms} hab × ${nights} noche${nights > 1 ? 's' : ''}`,
      amount: round(hotelTotal),
    });
  }

  // ---- Actividades ----
  if (input.activityIds.length > 0) {
    const activities = ACTIVITIES.filter((a) => input.activityIds.includes(a.id));
    for (const a of activities) {
      const total =
        a.pricePEN * adults + a.pricePEN * (1 - CHILD_ACTIVITY_DISCOUNT) * children;
      lines.push({
        label: a.name,
        detail:
          children > 0
            ? `${adults} ad × ${a.pricePEN} + ${children} niño (−40%)`
            : `${adults} × ${a.pricePEN}`,
        amount: round(total),
      });
    }
  }

  const subtotal = lines.reduce((acc, l) => acc + l.amount, 0);
  const taxes = round(subtotal * TAX_RATE);
  const total = subtotal + taxes;

  return {
    input,
    nights,
    lines,
    subtotal: round(subtotal),
    taxes,
    total: round(total),
    currency: 'PEN',
  };
};

const round = (n: number): number => Math.round(n);
