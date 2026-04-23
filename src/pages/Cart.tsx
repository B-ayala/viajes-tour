import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

import { useCartStore } from '@/store/cartStore';
import { useNotificationStore } from '@/store/notificationStore';
import { formatPEN, formatDate } from '@/utils/formatters';
import { getDestination } from '@/data/destinations';
import { handleImageError } from '@/utils/image';

const Cart = () => {
  const navigate = useNavigate();
  const { items, remove } = useCartStore();
  const total = useCartStore((s) => s.total());
  const notify = useNotificationStore((s) => s.notify);

  if (items.length === 0) {
    return (
      <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Tu carrito está vacío
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Buscá tu próximo destino y agregá el paquete que más te guste.
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate('/')}
          startIcon={<ArrowBackIcon />}
        >
          Explorar destinos
        </Button>
      </Container>
    );
  }

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Resumen de compra
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Stack spacing={2}>
            {items.map((item) => {
              const destination = getDestination(item.result.input.destinationId);
              return (
                <Paper key={item.id} sx={{ p: 2 }} variant="outlined">
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <Box
                      component="img"
                      src={item.image}
                      alt={item.title}
                      onError={handleImageError(item.packageId, 400, 300)}
                      sx={{
                        width: { xs: '100%', sm: 140 },
                        height: { xs: 160, sm: 100 },
                        objectFit: 'cover',
                        borderRadius: 2,
                      }}
                    />
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography variant="h6" sx={{ lineHeight: 1.3 }}>
                        {item.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {destination?.name} ·{' '}
                        {formatDate(item.result.input.startDate)} →{' '}
                        {formatDate(item.result.input.endDate)}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {item.result.input.passengers.adults} adulto
                        {item.result.input.passengers.adults > 1 ? 's' : ''}
                        {item.result.input.passengers.children > 0
                          ? ` · ${item.result.input.passengers.children} niño${
                              item.result.input.passengers.children > 1 ? 's' : ''
                            }`
                          : ''}
                      </Typography>
                    </Box>
                    <Stack alignItems="flex-end" justifyContent="space-between">
                      <IconButton
                        onClick={() => {
                          remove(item.id);
                          notify('Paquete removido', 'info');
                        }}
                        aria-label={`Quitar ${item.title} del carrito`}
                      >
                        <DeleteOutlineIcon />
                      </IconButton>
                      <Typography variant="h6" color="primary.main" sx={{ fontWeight: 700 }}>
                        {formatPEN(item.result.total)}
                      </Typography>
                    </Stack>
                  </Stack>
                </Paper>
              );
            })}
          </Stack>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, position: { md: 'sticky' }, top: 88 }} variant="outlined">
            <Typography variant="h6" sx={{ mb: 2 }}>
              Total del pedido
            </Typography>
            <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
              <Typography variant="body2" color="text.secondary">
                {items.length} paquete{items.length === 1 ? '' : 's'}
              </Typography>
              <Typography variant="body2">{formatPEN(total)}</Typography>
            </Stack>
            <Divider sx={{ my: 2 }} />
            <Stack direction="row" justifyContent="space-between" alignItems="baseline">
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                Total
              </Typography>
              <Typography variant="h5" color="primary.main" sx={{ fontWeight: 700 }}>
                {formatPEN(total)}
              </Typography>
            </Stack>
            <Button
              variant="contained"
              size="large"
              fullWidth
              sx={{ mt: 3 }}
              onClick={handleCheckout}
            >
              Ir a pagar
            </Button>
            <Button
              variant="text"
              fullWidth
              sx={{ mt: 1 }}
              onClick={() => navigate('/')}
            >
              Seguir explorando
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Cart;
