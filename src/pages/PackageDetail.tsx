import { useMemo } from 'react';
import {
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StarIcon from '@mui/icons-material/Star';
import { useNavigate, useParams } from 'react-router-dom';

import { PriceBreakdown } from '@/components/quotation/PriceBreakdown';
import { getPackage } from '@/data/packages';
import { getDestination } from '@/data/destinations';
import { useQuotationStore } from '@/store/quotationStore';
import { useCartStore } from '@/store/cartStore';
import { useNotificationStore } from '@/store/notificationStore';
import { quote, QuotationError } from '@/services/quotationService';
import type { QuotationInput, QuotationResult } from '@/types';
import { formatPEN } from '@/utils/formatters';
import { handleImageError } from '@/utils/image';

const PackageDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { input } = useQuotationStore();
  const addToCart = useCartStore((s) => s.add);
  const notify = useNotificationStore((s) => s.notify);

  const pkg = id ? getPackage(id) : undefined;
  const destination = pkg ? getDestination(pkg.destinationId) : undefined;

  const { result, packageInput } = useMemo(() => {
    if (!pkg) return { result: null as QuotationResult | null, packageInput: null };

    const baseInput: QuotationInput = input
      ? { ...input, destinationId: pkg.destinationId, hotelStars: pkg.hotelStars, transport: pkg.transport, tripType: 'pasajes_hotel' }
      : {
          originId: 'lim',
          destinationId: pkg.destinationId,
          startDate: new Date(Date.now() + 21 * 864e5).toISOString().slice(0, 10),
          endDate: new Date(Date.now() + 25 * 864e5).toISOString().slice(0, 10),
          passengers: { adults: 2, children: 0 },
          tripType: 'pasajes_hotel',
          transport: pkg.transport,
          hotelStars: pkg.hotelStars,
          activityIds: [],
        };

    try {
      const rawResult = quote(baseInput);
      // Aplicar descuento del paquete
      const discounted: QuotationResult = {
        ...rawResult,
        total: Math.round(rawResult.total * (1 - pkg.discount)),
        subtotal: Math.round(rawResult.subtotal * (1 - pkg.discount)),
      };
      return { result: discounted, packageInput: baseInput };
    } catch (err) {
      if (err instanceof QuotationError) {
        return { result: null, packageInput: baseInput };
      }
      throw err;
    }
  }, [pkg, input]);

  if (!pkg || !destination) {
    return (
      <Container maxWidth="md" sx={{ py: 6, textAlign: 'center' }}>
        <Typography variant="h5">Paquete no encontrado.</Typography>
        <Button variant="contained" sx={{ mt: 2 }} onClick={() => navigate('/')}>
          Volver al inicio
        </Button>
      </Container>
    );
  }

  const handleAddToCart = () => {
    if (!result) return;
    addToCart({
      packageId: pkg.id,
      title: pkg.title,
      image: pkg.image,
      result,
    });
    notify('Paquete agregado al carrito', 'success');
    navigate('/cart');
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button onClick={() => navigate(-1)} startIcon={<ArrowBackIcon />} sx={{ mb: 2 }}>
        Volver
      </Button>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Box
            component="img"
            src={pkg.image}
            alt={pkg.title}
            onError={handleImageError(pkg.id, 1600, 900)}
            sx={{
              width: '100%',
              height: { xs: 240, md: 380 },
              objectFit: 'cover',
              borderRadius: 3,
            }}
          />

          <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mt: 3 }}>
            {Array.from({ length: pkg.hotelStars }).map((_, i) => (
              <StarIcon key={i} sx={{ fontSize: 20, color: 'secondary.main' }} />
            ))}
            <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
              Hotel {pkg.hotelStars}★ · {pkg.transport === 'avion' ? 'Vuelo' : 'Bus'}
            </Typography>
          </Stack>

          <Typography variant="h4" component="h1" sx={{ mt: 1 }}>
            {pkg.title}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
            {destination.description}
          </Typography>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" sx={{ mb: 1.5 }}>
            Qué incluye
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ rowGap: 1 }}>
            {pkg.highlights.map((h) => (
              <Chip key={h} label={h} />
            ))}
          </Stack>

          {pkg.discount > 0 && (
            <Box
              sx={{
                mt: 3,
                p: 2,
                bgcolor: 'secondary.light',
                borderRadius: 2,
              }}
            >
              <Typography variant="subtitle2">
                Oferta exclusiva: ahorrás {Math.round(pkg.discount * 100)}% sobre la cotización
                base.
              </Typography>
            </Box>
          )}
        </Grid>

        <Grid item xs={12} md={4}>
          {result ? (
            <Stack spacing={2}>
              <PriceBreakdown result={result} />
              <Button
                variant="contained"
                size="large"
                startIcon={<ShoppingCartIcon />}
                onClick={handleAddToCart}
                fullWidth
              >
                Agregar al carrito · {formatPEN(result.total)}
              </Button>
              {packageInput && (
                <Typography variant="caption" color="text.secondary">
                  Válido para {packageInput.passengers.adults} adulto
                  {packageInput.passengers.adults > 1 ? 's' : ''}
                  {packageInput.passengers.children > 0
                    ? ` y ${packageInput.passengers.children} niño${
                        packageInput.passengers.children > 1 ? 's' : ''
                      }`
                    : ''}
                  .
                </Typography>
              )}
            </Stack>
          ) : (
            <Typography color="error">
              No pudimos cotizar este paquete con los datos actuales. Ajustá la búsqueda.
            </Typography>
          )}
        </Grid>
      </Grid>

    </Container>
  );
};

export default PackageDetail;
