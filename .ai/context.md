# Contexto técnico — Yopi Travel

## Producto
Plataforma web de cotización y venta de paquetes turísticos en Perú.
Competidores de referencia: Despegar, Booking, Airbnb.

## Stack
- React 18 + TypeScript (strict)
- Vite como bundler
- Material UI (MUI v5) como sistema de diseño base
- Zustand para estado global (más liviano que Redux; suficiente para este scope)
- React Router v6 con lazy loading de rutas
- Framer Motion para micro-interacciones

## Arquitectura
Feature-based / modular. La raíz `src/` se organiza por capas:
- `components/` — presentacionales puros + contenedores reutilizables
- `pages/` — vistas ruteables
- `services/` — lógica de negocio pura (cotización, pricing, etc.). Sin React.
- `hooks/` — lógica reactiva reutilizable
- `store/` — stores Zustand (quotation, cart, notifications)
- `utils/` — helpers puros (formatters, validators)
- `data/` — datasets mock (destinos, actividades)
- `types/` — tipos globales compartidos
- `theme/` — configuración centralizada de MUI (paleta, tipografía, overrides)

## Decisiones clave
1. **Pricing en `services/quotationService.ts`** — función pura sin efectos. Testeable. No conoce React.
2. **Estado global mínimo** — solo lo que cruza rutas (cotización actual, carrito, notificaciones).
   El estado de formularios vive local con `useState` hasta confirmar.
3. **Tipos en `types/quotation.ts`** — contrato único `QuotationInput` y `QuotationResult`.
   Cambios aquí obligan a actualizar servicio + UI.
4. **Moneda**: soles peruanos (PEN, `S/`). Formateado con `Intl.NumberFormat('es-PE')`.
5. **Sin CSS modules** — todo con `sx` prop de MUI o `styled()`. Mantener el sistema de diseño.

## Flujo de cotización
Home (form) → recalcula en tiempo real con `useQuotation` → al enviar
guarda en `quotationStore` → navega a `/results` → usuario elige paquete
→ `/package/:id` → agrega al carrito → `/cart`.

## No hacer
- No duplicar lógica de precio en componentes. Siempre pasar por `quotationService`.
- No mezclar lenguajes en keys (si labels en español, mantener español).
- No introducir Redux. Zustand cubre el caso.
