const currencyFormatter = new Intl.NumberFormat('es-PE', {
  style: 'currency',
  currency: 'PEN',
  maximumFractionDigits: 0,
});

const dateFormatter = new Intl.DateTimeFormat('es-PE', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
});

export const formatPEN = (n: number): string => currencyFormatter.format(n);

export const formatDate = (iso: string): string => {
  const d = new Date(iso + 'T00:00:00');
  return dateFormatter.format(d);
};

export const diffNights = (startISO: string, endISO: string): number => {
  const s = new Date(startISO + 'T00:00:00').getTime();
  const e = new Date(endISO + 'T00:00:00').getTime();
  const diff = Math.round((e - s) / 86_400_000);
  return Math.max(0, diff);
};
