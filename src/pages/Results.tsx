import { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LockIcon from '@mui/icons-material/Lock';
import { useNavigate } from 'react-router-dom';

import { SearchForm } from '@/components/quotation/SearchForm';
import { PackageCard } from '@/components/quotation/PackageCard';
import { ActivityPicker } from '@/components/quotation/ActivityPicker';
import { PriceBreakdown } from '@/components/quotation/PriceBreakdown';
import { useQuotationStore } from '@/store/quotationStore';
import { useCartStore } from '@/store/cartStore';
import { useNotificationStore } from '@/store/notificationStore';
import { useQuotation } from '@/hooks/useQuotation';
import { getDestination } from '@/data/destinations';
import { getActivitiesByDestination } from '@/data/activities';
import { getPackagesByDestination } from '@/data/packages';
import { formatPEN } from '@/utils/formatters';
import type { QuotationInput } from '@/types';

const Results = () => {
  const navigate = useNavigate();
  const { input, setQuotation } = useQuotationStore();
  const addToCart = useCartStore((s) => s.add);
  const notify = useNotificationStore((s) => s.notify);

  const [workingInput, setWorkingInput] = useState<QuotationInput | null>(input);
  const { result, error } = useQuotation(workingInput);

  // Mantener store sincronizado con los cambios que el usuario hace en vivo.
  useEffect(() => {
    if (result) setQuotation(result.input, result);
  }, [result, setQuotation]);

  const destination = useMemo(
    () => (workingInput ? getDestination(workingInput.destinationId) : undefined),
    [workingInput],
  );
  const activities = useMemo(
    () => (workingInput ? getActivitiesByDestination(workingInput.destinationId) : []),
    [workingInput],
  );
  const packages = useMemo(
    () => (workingInput ? getPackagesByDestination(workingInput.destinationId) : []),
    [workingInput],
  );

  if (!workingInput) {
    return (
      <Container maxWidth="md" sx={{ py: 6, textAlign: 'center' }}>
        <Typography variant="h5">Primero realizá una búsqueda.</Typography>
        <Button
          variant="contained"
          sx={{ mt: 2 }}
          onClick={() => navigate('/')}
          startIcon={<ArrowBackIcon />}
        >
          Volver al inicio
        </Button>
      </Container>
    );
  }

  const toggleActivity = (id: string) => {
    setWorkingInput((prev) =>
      prev
        ? {
            ...prev,
            activityIds: prev.activityIds.includes(id)
              ? prev.activityIds.filter((x) => x !== id)
              : [...prev.activityIds, id],
          }
        : prev,
    );
  };

  const handlePayNow = () => {
    if (!result || !destination) return;
    addToCart({
      packageId: `quote-${destination.id}`,
      title: `Cotización personalizada · ${destination.name}`,
      image: destination.image,
      result,
    });
    notify('Cotización agregada al carrito', 'success');
    navigate('/checkout');
  };

  const summary =
    result && destination ? (
      <Stack spacing={2}>
        <PriceBreakdown result={result} />
        <Button
          variant="contained"
          size="large"
          color="primary"
          startIcon={<LockIcon />}
          onClick={handlePayNow}
          fullWidth
        >
          Pagar ahora · {formatPEN(result.total)}
        </Button>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ textAlign: 'center' }}
        >
          Yape · Plin · tarjeta · efectivo
        </Typography>
      </Stack>
    ) : null;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button
        onClick={() => navigate('/')}
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 2 }}
      >
        Modificar búsqueda
      </Button>

      <Typography variant="h4" component="h1">
        {destination?.name ?? 'Resultados'}
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        {destination?.description}
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <SearchForm
            initial={workingInput}
            submitLabel="Actualizar"
            dense
            onSubmit={(next) => {
              setWorkingInput(next);
              notify('Cotización actualizada', 'success');
            }}
          />

          <Box sx={{ mt: 3 }}>
            <ActivityPicker
              activities={activities}
              selected={workingInput.activityIds}
              onToggle={toggleActivity}
            />
          </Box>

          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}

          {/* Mobile: resumen y CTA antes de la grilla de paquetes */}
          <Box sx={{ display: { xs: 'block', md: 'none' }, mt: 4 }}>
            {summary}
          </Box>

          <Stack
            direction="row"
            alignItems="baseline"
            justifyContent="space-between"
            sx={{ mt: { xs: 4, md: 5 }, mb: 2 }}
          >
            <Typography variant="h5" component="h2">
              Paquetes sugeridos
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {packages.length} opcion{packages.length === 1 ? '' : 'es'}
            </Typography>
          </Stack>

          <Grid container spacing={2.5}>
            {packages.map((pkg, i) => (
              <Grid item xs={12} sm={6} key={pkg.id}>
                <PackageCard
                  pkg={pkg}
                  totalPEN={result?.total ?? 0}
                  onClick={() => navigate(`/package/${pkg.id}`)}
                  index={i}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Desktop: resumen sticky en columna derecha */}
        <Grid
          item
          xs={12}
          md={4}
          sx={{
            display: { xs: 'none', md: 'block' },
            position: { md: 'sticky' },
            top: 88,
            alignSelf: 'flex-start',
          }}
        >
          {summary}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Results;
