# Guía UI/UX — Yopi Travel

## Identidad visual
Inspirada en Perú: cultura andina, Machu Picchu, textiles.

### Paleta
- **Primary**: `#D32F2F` (rojo bandera peruana) — CTAs, acentos
- **Primary dark**: `#9A0007`
- **Secondary**: `#F5B700` (amarillo sol inca) — badges, destacados
- **Background**: `#FAFAFA` (off-white)
- **Surface**: `#FFFFFF`
- **Text primary**: `#1A1A1A`
- **Text secondary**: `#5F6368`
- **Success**: `#2E7D32`
- **Error**: `#C62828`

### Tipografía
- Headings: `Poppins` 600/700
- Body: `Inter` 400/500
- Fallback: `-apple-system, Roboto, sans-serif`

### Radio y sombras
- Border radius default: **12px** (cards), **8px** (botones/inputs)
- Shadow suave tipo Airbnb, no plana total

## Principios UX
1. **Mobile-first** — todo se diseña primero para 360–414px y escala.
2. **Una decisión por pantalla** — evitar sobrecarga. El buscador del Home es el héroe.
3. **Cotización en vivo** — cualquier cambio del form recalcula al instante (debounce 250ms).
   El usuario nunca espera un botón para ver el efecto del cambio.
4. **Transparencia de precio** — siempre mostrar desglose. Nada de "fees ocultos".
5. **Feedback inmediato** — notificaciones (snackbar) para toda acción del carrito.
6. **Accesibilidad (a11y)**:
   - Contraste AA mínimo
   - Labels asociados (`htmlFor`)
   - Focus ring visible
   - `aria-label` en iconos sin texto
   - Navegación por teclado funcional

## Componentes tipo
- **Card** con hover sutil (elevación + translate -2px)
- **Hero** del home con imagen de Machu Picchu y buscador sobrepuesto
- **Stepper** opcional para el checkout
- **Chips** para actividades seleccionadas
- **Skeletons** durante carga (nunca spinners solos)

## Animaciones
- Entrada de cards: fade + slide up, stagger 50ms
- Transiciones de ruta: fade 200ms
- Nunca bloquear interacción por animación > 400ms
