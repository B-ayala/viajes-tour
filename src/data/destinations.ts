import type { Destination } from '@/types';

/**
 * Destinos turísticos de Perú. Precios base referenciales (PEN, ida+vuelta por adulto desde Lima).
 * Fuente: valores aproximados de mercado, no conectados a API real.
 */
export const DESTINATIONS: Destination[] = [
  {
    id: 'cusco',
    name: 'Cusco',
    region: 'Cusco',
    image:
      'https://images.unsplash.com/photo-1587595431973-160d0d94add1?auto=format&fit=crop&w=1200&q=80',
    description:
      'Capital del imperio inca. Puerta de entrada a Machu Picchu y el Valle Sagrado.',
    priceFactor: 1.15,
    planeBasePEN: 420,
    busBasePEN: 180,
  },
  {
    id: 'arequipa',
    name: 'Arequipa',
    region: 'Arequipa',
    image:
      'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=1200&q=80',
    description:
      'La Ciudad Blanca, rodeada de volcanes. Base para visitar el Cañón del Colca.',
    priceFactor: 1.0,
    planeBasePEN: 310,
    busBasePEN: 140,
  },
  {
    id: 'puno',
    name: 'Puno',
    region: 'Puno',
    image:
      'https://images.unsplash.com/photo-1580974511897-f4f53d0cff5f?auto=format&fit=crop&w=1200&q=80',
    description:
      'Orillas del lago Titicaca, las islas flotantes de los Uros y cultura aymara.',
    priceFactor: 1.05,
    planeBasePEN: 360,
    busBasePEN: 160,
  },
  {
    id: 'iquitos',
    name: 'Iquitos',
    region: 'Loreto',
    image:
      'https://images.unsplash.com/photo-1560948223-67c2b3af8835?auto=format&fit=crop&w=1200&q=80',
    description:
      'La puerta de la Amazonía peruana. Lodges, fauna y gastronomía amazónica.',
    priceFactor: 1.2,
    planeBasePEN: 480,
    busBasePEN: 0, // sin bus directo
  },
  {
    id: 'trujillo',
    name: 'Trujillo',
    region: 'La Libertad',
    image:
      'https://images.unsplash.com/photo-1570299437488-d9e82e63f5cb?auto=format&fit=crop&w=1200&q=80',
    description:
      'Huacas moches, Chan Chan y las playas de Huanchaco. Patrimonio prehispánico.',
    priceFactor: 0.9,
    planeBasePEN: 240,
    busBasePEN: 110,
  },
  {
    id: 'paracas',
    name: 'Paracas & Ica',
    region: 'Ica',
    image:
      'https://images.unsplash.com/photo-1568454537842-d933259bb258?auto=format&fit=crop&w=1200&q=80',
    description:
      'Islas Ballestas, Reserva Nacional y las dunas de Huacachina.',
    priceFactor: 0.85,
    planeBasePEN: 0, // no hay vuelo habitual
    busBasePEN: 90,
  },
];

export const ORIGINS = [
  { id: 'lim', name: 'Lima' },
  { id: 'aqp', name: 'Arequipa' },
  { id: 'cuz', name: 'Cusco' },
  { id: 'tru', name: 'Trujillo' },
];

export const getDestination = (id: string): Destination | undefined =>
  DESTINATIONS.find((d) => d.id === id);
