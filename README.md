# Yopi Travel

Cotizador y venta de paquetes turísticos en Perú. Proyecto frontend construido con React + TypeScript + Vite + Material UI.

## Stack

- **React 18** + **TypeScript** (strict) + **Vite**
- **Material UI 5** para sistema de diseño + `@mui/x-date-pickers` (dayjs)
- **Zustand** para estado global (quotation, cart, notifications)
- **React Router 6** con `React.lazy` + `Suspense`
- **Framer Motion** para micro-interacciones

## Scripts

```bash
npm install
npm run dev       # arranca Vite en http://localhost:5173
npm run build     # typecheck + build de producción
npm run preview   # sirve el build localmente
```

## Estructura

```
src/
├── components/
│   ├── common/          NotificationHost, PageLoader
│   ├── layout/          Header, Footer
│   └── quotation/       SearchForm, PackageCard, PriceBreakdown, ActivityPicker
├── pages/               Home, Results, PackageDetail, Cart  (todas con lazy import)
├── services/            pricing.ts (constantes), quotationService.ts (función pura)
├── hooks/               useQuotation
├── store/               quotationStore, cartStore (persist), notificationStore
├── data/                destinations.ts, activities.ts, packages.ts (mocks)
├── types/               quotation.ts (contratos)
├── utils/               formatters (PEN, fechas, noches)
├── theme/               createTheme con paleta/tipografía/overrides
├── App.tsx              Router + Suspense
└── main.tsx             Bootstrap con providers
```

Contexto vivo en `.ai/`:
- `context.md` — decisiones técnicas y arquitectura
- `ui-guidelines.md` — paleta, tipografía, UX
- `best-practices.md` — reglas de código y performance

## Flujo de cotización

1. **Home** — hero con imagen andina + `SearchForm` (origen, destino, fechas, pasajeros, tipo de viaje, transporte, hotel).
2. Al enviar, se ejecuta `quote()` del servicio → se guarda en `quotationStore` → navega a `/results`.
3. **Results** — el mismo `SearchForm` en modo denso + `ActivityPicker` para extras + grilla de `PackageCard` sugeridos + `PriceBreakdown` sticky. Cualquier cambio recalcula en vivo vía `useQuotation`.
4. **PackageDetail** — imagen, highlights, desglose con descuento del paquete aplicado y CTA "Agregar al carrito".
5. **Cart** — lista de paquetes, total, checkout simulado (dispara notificación y limpia carrito).

## Lógica de precio

Toda la lógica vive en [`src/services/quotationService.ts`](src/services/quotationService.ts) y [`src/services/pricing.ts`](src/services/pricing.ts). Es una función pura: `quote(input: QuotationInput): QuotationResult`.

Variables que influyen en el precio:
- **Destino** — cada destino tiene `planeBasePEN`, `busBasePEN` y `priceFactor` (dificultad/demanda).
- **Temporada** — junio–agosto y diciembre–enero = temporada alta (×1.15); febrero–marzo = baja (×0.9).
- **Pasajeros** — niños pagan 50% menos en transporte y 40% menos en actividades.
- **Hotel** — tarifa por noche × habitaciones necesarias × noches. La ocupación estándar es 2 adultos + hasta 2 niños por habitación.
- **Actividades** — precio fijo por actividad, con descuento por niño.
- **Impuestos/servicio** — 10% sobre subtotal (simplificación).

Un destino puede no tener vuelo directo (ej. Paracas) o no tener bus (ej. Iquitos); el servicio lanza `QuotationError` con mensaje claro.

## Decisiones técnicas relevantes

- **Zustand > Redux** por scope. El proyecto no justifica el boilerplate de Redux Toolkit. Un slice por dominio basta.
- **Estado de formulario local (`useState`)** hasta confirmar. El estado global solo contiene la cotización actual, el carrito y notificaciones — lo que cruza rutas.
- **`quote()` pura** — no conoce React. Es trivial de testear unitariamente (pendiente).
- **Recálculo en vivo en `Results`** mediante `useQuotation` con comparación por clave estable (JSON de input). Sin debounce artificial: el cálculo es síncrono y barato.
- **Carrito persistido** con `zustand/middleware persist` en `localStorage`. Sobrevive a refresh.
- **Rutas lazy** + `Suspense` con `PageLoader` para reducir bundle inicial.
- **Tema centralizado** — paleta peruana (rojo `#D32F2F`, amarillo `#F5B700`) y tipografías Poppins/Inter por preconnect en `index.html`.
- **a11y** — `aria-label` en iconos, `htmlFor` implícito de MUI, contraste AA, navegación por teclado, `role="button"` + `tabIndex` en targets clickeables no nativos.
- **Imágenes externas** (Unsplash) con `loading="lazy"` y dimensiones fijas para evitar CLS. En producción conviene hostear/optimizar.

## Qué NO se hizo intencionalmente

- No hay tests automáticos (fuera de alcance). El servicio de cotización es puro y está listo para Jest/Vitest.
- No hay backend real ni gateway de pagos. El "checkout" es simulado.
- No se internacionaliza (todo en es-PE).
- No se implementó autenticación ni panel de usuario.

## Siguientes pasos sugeridos

1. Tests unitarios para `quote()` y `roomsNeeded()` (casos borde: 3 niños con 1 adulto, viaje sin vuelo).
2. Reemplazar datos mock por capa `api/` con fetch + React Query.
3. Skeletons en Results mientras se cotiza (si cambia a async).
4. Filtros de paquetes (precio, estrellas, transporte) en `/results`.
