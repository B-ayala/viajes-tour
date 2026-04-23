import type { Activity } from '@/types';

export const ACTIVITIES: Activity[] = [
  {
    id: 'mapi',
    name: 'Tour guiado a Machu Picchu',
    destinationId: 'cusco',
    pricePEN: 380,
    durationHours: 10,
    description: 'Traslado, entrada y guía oficial a la ciudadela inca.',
  },
  {
    id: 'valle-sagrado',
    name: 'Valle Sagrado full day',
    destinationId: 'cusco',
    pricePEN: 180,
    durationHours: 8,
    description: 'Pisac, Ollantaytambo y Chinchero con almuerzo buffet.',
  },
  {
    id: 'city-tour-cusco',
    name: 'City tour Cusco',
    destinationId: 'cusco',
    pricePEN: 90,
    durationHours: 4,
    description: 'Catedral, Qoricancha y ruinas cercanas.',
  },
  {
    id: 'colca',
    name: 'Cañón del Colca 2 días',
    destinationId: 'arequipa',
    pricePEN: 320,
    durationHours: 48,
    description: 'Mirador del cóndor, aguas termales y pueblos tradicionales.',
  },
  {
    id: 'city-tour-aqp',
    name: 'City tour Arequipa',
    destinationId: 'arequipa',
    pricePEN: 70,
    durationHours: 3,
    description: 'Monasterio de Santa Catalina y mirador de Yanahuara.',
  },
  {
    id: 'uros',
    name: 'Islas Uros y Taquile',
    destinationId: 'puno',
    pricePEN: 150,
    durationHours: 8,
    description: 'Navegación por el Titicaca, islas flotantes y almuerzo típico.',
  },
  {
    id: 'amazonia',
    name: 'Lodge amazónico 3 días',
    destinationId: 'iquitos',
    pricePEN: 720,
    durationHours: 72,
    description: 'Caminatas, avistamiento de fauna y pesca de pirañas.',
  },
  {
    id: 'chan-chan',
    name: 'Chan Chan y Huacas',
    destinationId: 'trujillo',
    pricePEN: 110,
    durationHours: 5,
    description: 'Visita guiada a la ciudadela de barro más grande de América.',
  },
  {
    id: 'ballestas',
    name: 'Islas Ballestas + Reserva',
    destinationId: 'paracas',
    pricePEN: 140,
    durationHours: 6,
    description: 'Lobos marinos, pingüinos y paisajes de la costa desértica.',
  },
  {
    id: 'huacachina',
    name: 'Buggies y sandboarding en Huacachina',
    destinationId: 'paracas',
    pricePEN: 95,
    durationHours: 3,
    description: 'Recorrido por las dunas al atardecer.',
  },
];

export const getActivitiesByDestination = (destinationId: string): Activity[] =>
  ACTIVITIES.filter((a) => a.destinationId === destinationId);

export const getActivity = (id: string): Activity | undefined =>
  ACTIVITIES.find((a) => a.id === id);
