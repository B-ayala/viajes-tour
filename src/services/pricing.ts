import type { HotelStars } from '@/types';

/**
 * Constantes de pricing. Cualquier cambio acá impacta toda la cotización.
 * Mantener sincronizado con el documento comercial (futuro).
 */

/** Precio por noche por habitación doble según estrellas (PEN) */
export const HOTEL_RATE_PER_NIGHT: Record<HotelStars, number> = {
  3: 140,
  4: 260,
  5: 480,
};

/** Ocupación estándar por habitación (2 adultos + hasta 2 niños) */
export const ROOM_OCCUPANCY = {
  adultsPerRoom: 2,
  childrenPerRoom: 2,
};

/** Descuentos aplicados sobre transporte */
export const CHILD_TRANSPORT_DISCOUNT = 0.5; // 50% off

/** Descuentos de actividad por niño */
export const CHILD_ACTIVITY_DISCOUNT = 0.4;

/** IGV/impuestos aplicados al subtotal (Perú: 18% pero simplificamos 10% servicio) */
export const TAX_RATE = 0.1;

/** Factor de temporada (estacionalidad simple basada en mes) */
export const getSeasonFactor = (iso: string): number => {
  const month = new Date(iso + 'T00:00:00').getMonth() + 1;
  // Temporada alta: junio–agosto y diciembre–enero
  if ([6, 7, 8, 12, 1].includes(month)) return 1.15;
  // Media: abril, mayo, septiembre, octubre, noviembre
  if ([4, 5, 9, 10, 11].includes(month)) return 1.0;
  // Baja: febrero–marzo
  return 0.9;
};

/** Cantidad de habitaciones necesarias para N personas */
export const roomsNeeded = (adults: number, children: number): number => {
  const byAdults = Math.ceil(adults / ROOM_OCCUPANCY.adultsPerRoom);
  // Los niños caben en habitaciones existentes; solo se agrega si exceden el cupo
  const childrenExcess = Math.max(0, children - byAdults * ROOM_OCCUPANCY.childrenPerRoom);
  const extra = Math.ceil(childrenExcess / (ROOM_OCCUPANCY.adultsPerRoom + ROOM_OCCUPANCY.childrenPerRoom));
  return Math.max(1, byAdults + extra);
};
