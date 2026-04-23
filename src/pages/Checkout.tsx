import { useMemo, useState } from 'react';
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LockIcon from '@mui/icons-material/Lock';
import { useNavigate } from 'react-router-dom';

import { PAYMENT_METHODS, getPaymentMethod } from '@/data/paymentMethods';
import { PaymentMethodOption } from '@/components/checkout/PaymentMethodOption';
import {
  PaymentInstructions,
  type CardFields,
} from '@/components/checkout/PaymentInstructions';
import { useCartStore } from '@/store/cartStore';
import { useNotificationStore } from '@/store/notificationStore';
import { handleImageError } from '@/utils/image';
import { formatPEN } from '@/utils/formatters';

const Checkout = () => {
  const navigate = useNavigate();
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clear);
  const total = useCartStore((s) => s.total());
  const notify = useNotificationStore((s) => s.notify);

  const [selectedId, setSelectedId] = useState<string>('yape');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [card, setCard] = useState<CardFields>({
    number: '',
    expiry: '',
    cvv: '',
    holder: '',
  });

  const method = useMemo(
    () => getPaymentMethod(selectedId) ?? PAYMENT_METHODS[0],
    [selectedId],
  );

  const canPay = useMemo(() => {
    if (!email.includes('@') || phone.trim().length < 6) return false;
    if (method.kind === 'card') {
      return (
        card.number.replace(/\s/g, '').length >= 13 &&
        card.expiry.length >= 4 &&
        card.cvv.length >= 3 &&
        card.holder.trim().length > 2
      );
    }
    return true;
  }, [email, phone, method, card]);

  if (items.length === 0) {
    return (
      <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          No hay nada por pagar
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Agregá un paquete o una cotización a tu carrito para continuar.
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

  const handlePay = () => {
    notify(
      `Pago confirmado con ${method.name}. Te enviamos los vouchers a ${email}.`,
      'success',
    );
    clearCart();
    navigate('/');
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button onClick={() => navigate('/cart')} startIcon={<ArrowBackIcon />} sx={{ mb: 1 }}>
        Volver al carrito
      </Button>
      <Typography variant="h4" component="h1" gutterBottom>
        Finalizar compra
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Pago 100% seguro y simulado. No se procesa ninguna tarjeta real.
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper variant="outlined" sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              1. Datos de contacto
            </Typography>
            <Grid container spacing={2} sx={{ mt: 0.5 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                  required
                  placeholder="tu@email.com"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Celular"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  fullWidth
                  required
                  placeholder="+51 987 654 321"
                />
              </Grid>
            </Grid>
          </Paper>

          <Paper variant="outlined" sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              2. Método de pago
            </Typography>
            <Stack spacing={1.5} sx={{ mt: 1 }} role="radiogroup" aria-label="Método de pago">
              {PAYMENT_METHODS.map((pm) => (
                <PaymentMethodOption
                  key={pm.id}
                  method={pm}
                  selected={selectedId === pm.id}
                  onSelect={() => setSelectedId(pm.id)}
                />
              ))}
            </Stack>

            <Divider sx={{ my: 3 }} />

            <PaymentInstructions
              method={method}
              total={total}
              card={card}
              onCardChange={setCard}
            />
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper
            variant="outlined"
            sx={{ p: 3, position: { md: 'sticky' }, top: 88 }}
          >
            <Typography variant="h6" gutterBottom>
              Tu pedido
            </Typography>
            <Stack spacing={1.5} sx={{ mt: 1 }}>
              {items.map((item) => (
                <Stack
                  key={item.id}
                  direction="row"
                  spacing={1.5}
                  alignItems="center"
                >
                  <Box
                    component="img"
                    src={item.image}
                    alt={item.title}
                    onError={handleImageError(item.packageId, 200, 200)}
                    sx={{
                      width: 52,
                      height: 52,
                      objectFit: 'cover',
                      borderRadius: 1,
                      flexShrink: 0,
                    }}
                  />
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 500,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {item.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {item.result.input.passengers.adults} ad
                      {item.result.input.passengers.children > 0 &&
                        ` · ${item.result.input.passengers.children} niño${
                          item.result.input.passengers.children > 1 ? 's' : ''
                        }`}
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {formatPEN(item.result.total)}
                  </Typography>
                </Stack>
              ))}
            </Stack>
            <Divider sx={{ my: 2 }} />
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="baseline"
            >
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
              startIcon={<LockIcon />}
              onClick={handlePay}
              disabled={!canPay}
              fullWidth
              sx={{ mt: 3 }}
            >
              Pagar {formatPEN(total)}
            </Button>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ display: 'block', textAlign: 'center', mt: 1 }}
            >
              Al pagar aceptás los términos y la política de viaje.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Checkout;
