# Buenas prácticas — Yopi Travel

## Código
- **TypeScript strict**. Nada de `any` fuera de adapters de librerías externas.
- Tipos en `types/`, importados con alias `@/types`.
- Componentes: **función + FC implícito** (no `React.FC` salvo necesario).
- Props tipadas con `interface` (extensible). Resto como `type`.
- Archivos: un componente público por archivo. Helpers privados abajo.
- Nombres: `PascalCase` componentes, `camelCase` funciones, `SCREAMING_SNAKE` constantes.

## Organización
- Agrupar por feature cuando crece (ej. `components/quotation/`).
- Barrel `index.ts` por carpeta solo cuando hay 3+ exports.
- No crear abstracciones prematuras. Tres líneas similares > abstracción temprana.

## Performance
- `React.lazy` + `Suspense` en rutas.
- `useMemo` solo cuando hay cálculo pesado real (ej. cotización sobre lista grande).
- Imágenes con `loading="lazy"` y dimensiones fijas para evitar CLS.
- No renderizar listas sin `key` estable.

## Estado
- Local > global. Subir a store solo cuando más de una página lo lee.
- Zustand: un slice por dominio. Sin reducers anidados.
- Nunca mutar arrays/objetos del store: siempre devolver nuevos.

## Servicios y lógica
- Funciones puras cuando se pueda. Sin side-effects escondidos.
- Lógica de negocio **fuera** de componentes. Componentes llaman, no calculan.
- Validaciones en el punto de entrada del servicio.

## Accesibilidad
- Todo input con label visible o `aria-label`.
- Botones con texto o `aria-label`. Nunca íconos huérfanos.
- Contraste mínimo AA.
- Orden de tabulación coherente.

## Testing (cuando aplique)
- Unit para `services/` (lógica pura).
- Integración para flujos críticos (cotizar → agregar al carrito).
- Nombres tipo `cuando X entonces Y`.

## Commits
- Conventional commits: `feat:`, `fix:`, `refactor:`, `chore:`, `docs:`.
- Un commit = una unidad lógica.

## Qué NO hacer
- No introducir estado global si no cruza rutas.
- No duplicar constantes de precio; están en `services/pricing.ts`.
- No usar `!important` en `sx`. Ajustar specificity desde el theme.
- No agregar librerías sin justificar costo vs. beneficio.
