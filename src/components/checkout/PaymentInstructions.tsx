import { useMemo } from 'react';
import {
  Alert,
  Box,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import type { PaymentMethod } from '@/data/paymentMethods';
import { formatPEN } from '@/utils/formatters';

export interface CardFields {
  number: string;
  expiry: string;
  cvv: string;
  holder: string;
}

interface Props {
  method: PaymentMethod;
  total: number;
  card: CardFields;
  onCardChange: (next: CardFields) => void;
}

export const PaymentInstructions = ({ method, total, card, onCardChange }: Props) => {
  const reference = useMemo(
    () => `YPI-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
    [],
  );

  if (method.kind === 'wallet') {
    return (
      <Box>
        <Typography variant="subtitle2" gutterBottom>
          Cómo pagar con {method.name}
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm="auto">
            <Box
              sx={{
                width: 140,
                height: 140,
                display: 'grid',
                placeItems: 'center',
                bgcolor: 'grey.100',
                borderRadius: 2,
                border: (t) => `1px dashed ${t.palette.divider}`,
              }}
              aria-label="Código QR simulado"
            >
              <QrCode2Icon sx={{ fontSize: 110, color: method.color }} />
            </Box>
          </Grid>
          <Grid item xs>
            <Stack spacing={0.75}>
              <Typography variant="body2">
                1. Abrí la app de <strong>{method.name}</strong>.
              </Typography>
              <Typography variant="body2">
                2. Escaneá el QR o enviá a <strong>+51 987 654 321</strong>.
              </Typography>
              <Typography variant="body2">
                3. Ingresá monto: <strong>{formatPEN(total)}</strong>.
              </Typography>
              <Typography variant="body2">
                4. Referencia: <strong>{reference}</strong>.
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    );
  }

  if (method.kind === 'cash') {
    const cip = `${Math.floor(100 + Math.random() * 900)}-${Math.floor(
      100000 + Math.random() * 900000,
    )}`;
    return (
      <Stack spacing={2}>
        <Typography variant="subtitle2">Tu código PagoEfectivo</Typography>
        <Paper
          variant="outlined"
          sx={{
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            bgcolor: 'grey.50',
          }}
        >
          <Box>
            <Typography variant="caption" color="text.secondary">
              Código CIP
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 700, letterSpacing: 1 }}>
              {cip}
            </Typography>
          </Box>
          <ContentCopyIcon color="action" />
        </Paper>
        <Alert severity="info" icon={<AccessTimeIcon />}>
          Válido por <strong>48 horas</strong>. Pagá en bodegas, agentes BCP, BBVA,
          Scotiabank, Kasnet, Western Union o Tambo+.
        </Alert>
      </Stack>
    );
  }

  if (method.kind === 'transfer') {
    return (
      <Stack spacing={1}>
        <Typography variant="subtitle2">Datos para transferencia</Typography>
        <Typography variant="body2">
          Titular: <strong>Yopi Travel SAC</strong> · RUC 20501234567
        </Typography>
        <Typography variant="body2">
          BCP · Cuenta corriente soles: <strong>191-2345678-0-99</strong>
        </Typography>
        <Typography variant="body2">
          CCI: <strong>002-191-002345678099-12</strong>
        </Typography>
        <Alert severity="info" sx={{ mt: 1 }}>
          Enviá el comprobante a pagos@yopitravel.pe indicando referencia{' '}
          <strong>{reference}</strong>.
        </Alert>
      </Stack>
    );
  }

  // Card
  return (
    <Stack spacing={2}>
      <Typography variant="subtitle2">Datos de la tarjeta</Typography>
      <TextField
        label="Número de tarjeta"
        placeholder="1234 5678 9012 3456"
        value={card.number}
        onChange={(e) => onCardChange({ ...card, number: e.target.value })}
        inputProps={{ inputMode: 'numeric', maxLength: 19 }}
        fullWidth
      />
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            label="Vencimiento"
            placeholder="MM/AA"
            value={card.expiry}
            onChange={(e) => onCardChange({ ...card, expiry: e.target.value })}
            inputProps={{ maxLength: 5 }}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="CVV"
            placeholder="123"
            value={card.cvv}
            onChange={(e) => onCardChange({ ...card, cvv: e.target.value })}
            inputProps={{ inputMode: 'numeric', maxLength: 4 }}
            fullWidth
          />
        </Grid>
      </Grid>
      <TextField
        label="Titular (como figura en la tarjeta)"
        value={card.holder}
        onChange={(e) => onCardChange({ ...card, holder: e.target.value })}
        fullWidth
      />
    </Stack>
  );
};
