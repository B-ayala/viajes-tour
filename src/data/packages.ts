import type { TravelPackage } from '@/types';

/**
 * Paquetes precompuestos por destino. En producción vendría de backend.
 * Los precios se recalculan sobre la cotización del usuario aplicando `discount`.
 */
export const PACKAGES: TravelPackage[] = [
  {
    id: 'cusco-classic',
    destinationId: 'cusco',
    title: 'Cusco Clásico 4D/3N',
    highlights: ['City tour', 'Valle Sagrado', 'Machu Picchu'],
    image:
      'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=1200&q=80',
    hotelStars: 4,
    transport: 'avion',
    discount: 0.08,
  },
  {
    id: 'cusco-premium',
    destinationId: 'cusco',
    title: 'Cusco Premium 5D/4N',
    highlights: ['Hotel 5★', 'Machu Picchu', 'Montaña 7 colores', 'Valle Sagrado'],
    image:
      'https://images.unsplash.com/photo-1531065208531-4036c0dba3ca?auto=format&fit=crop&w=1200&q=80',
    hotelStars: 5,
    transport: 'avion',
    discount: 0.05,
  },
  {
    id: 'arequipa-colca',
    destinationId: 'arequipa',
    title: 'Arequipa + Colca 3D/2N',
    highlights: ['City tour', 'Cañón del Colca', 'Aguas termales'],
    image:
      'https://images.unsplash.com/photo-1560948223-67c2b3af8835?auto=format&fit=crop&w=1200&q=80',
    hotelStars: 4,
    transport: 'avion',
    discount: 0.1,
  },
  {
    id: 'puno-titicaca',
    destinationId: 'puno',
    title: 'Titicaca esencial 3D/2N',
    highlights: ['Uros', 'Taquile', 'Hotel vista lago'],
    image:
      'https://images.unsplash.com/photo-1568454537842-d933259bb258?auto=format&fit=crop&w=1200&q=80',
    hotelStars: 3,
    transport: 'bus',
    discount: 0.12,
  },
  {
    id: 'amazonia',
    destinationId: 'iquitos',
    title: 'Amazonía 4D/3N',
    highlights: ['Lodge en la selva', 'Fauna amazónica', 'Comunidades nativas'],
    image:
      'https://images.unsplash.com/photo-1587595431973-160d0d94add1?auto=format&fit=crop&w=1200&q=80',
    hotelStars: 4,
    transport: 'avion',
    discount: 0.07,
  },
  {
    id: 'norte-chan',
    destinationId: 'trujillo',
    title: 'Norte histórico 3D/2N',
    highlights: ['Chan Chan', 'Huacas del Sol y la Luna', 'Huanchaco'],
    image:
      'https://images.unsplash.com/photo-1570299437488-d9e82e63f5cb?auto=format&fit=crop&w=1200&q=80',
    hotelStars: 3,
    transport: 'avion',
    discount: 0.1,
  },
  {
    id: 'paracas-ica',
    destinationId: 'paracas',
    title: 'Paracas + Huacachina 2D/1N',
    highlights: ['Islas Ballestas', 'Reserva Nacional', 'Buggies y sandboarding'],
    image:
      'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=1200&q=80',
    hotelStars: 3,
    transport: 'bus',
    discount: 0.15,
  },
];

export const getPackagesByDestination = (destinationId: string): TravelPackage[] =>
  PACKAGES.filter((p) => p.destinationId === destinationId);

export const getPackage = (id: string): TravelPackage | undefined =>
  PACKAGES.find((p) => p.id === id);
