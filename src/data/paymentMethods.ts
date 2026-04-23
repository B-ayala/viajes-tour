export type PaymentKind = 'wallet' | 'cash' | 'card' | 'transfer';

export interface PaymentMethod {
  id: string;
  name: string;
  kind: PaymentKind;
  description: string;
  /** Color de marca (fondo del avatar) */
  color: string;
  /** Iniciales o símbolo a mostrar dentro del avatar */
  initials: string;
  /** Entidad emisora, para subrayar confianza */
  issuer?: string;
}

/**
 * Métodos de pago disponibles en Perú. Simulados; no hay gateway real.
 * Orden: billeteras digitales (más usadas) → efectivo → tarjeta → transferencia.
 */
export const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: 'yape',
    name: 'Yape',
    kind: 'wallet',
    description: 'Envía el pago desde la app Yape. Confirmación inmediata.',
    color: '#6C2BD7',
    initials: 'Y',
    issuer: 'BCP',
  },
  {
    id: 'plin',
    name: 'Plin',
    kind: 'wallet',
    description: 'BBVA, Interbank, Scotiabank o BanBif. Sin comisión.',
    color: '#E3127B',
    initials: 'P',
    issuer: 'BBVA · Interbank · Scotiabank',
  },
  {
    id: 'tunki',
    name: 'Tunki',
    kind: 'wallet',
    description: 'Billetera digital para pagos entre celulares.',
    color: '#F5B700',
    initials: 'T',
    issuer: 'Interbank',
  },
  {
    id: 'lukita',
    name: 'Lukita',
    kind: 'wallet',
    description: 'Transfiere sin cuenta bancaria con tu número.',
    color: '#1E88E5',
    initials: 'L',
    issuer: 'Caja Piura',
  },
  {
    id: 'pagoefectivo',
    name: 'PagoEfectivo',
    kind: 'cash',
    description: 'Pagá en efectivo en bodegas, agentes y bancos con un código CIP.',
    color: '#D32F2F',
    initials: '$',
  },
  {
    id: 'tarjeta',
    name: 'Tarjeta de crédito o débito',
    kind: 'card',
    description: 'Visa, Mastercard, American Express y Diners Club.',
    color: '#1A1A1A',
    initials: '••',
  },
  {
    id: 'transferencia',
    name: 'Transferencia bancaria',
    kind: 'transfer',
    description: 'BCP, BBVA, Interbank o Scotiabank. Acreditación en 24 hs.',
    color: '#2E7D32',
    initials: 'B',
  },
];

export const getPaymentMethod = (id: string): PaymentMethod | undefined =>
  PAYMENT_METHODS.find((m) => m.id === id);
