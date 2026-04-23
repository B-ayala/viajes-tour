import {
  Box,
  Divider,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import type { QuotationResult } from '@/types';
import { formatPEN } from '@/utils/formatters';

interface Props {
  result: QuotationResult;
  compact?: boolean;
}

export const PriceBreakdown = ({ result, compact }: Props) => (
  <Paper
    elevation={0}
    sx={{
      p: compact ? 2 : 3,
      border: (t) => `1px solid ${t.palette.divider}`,
    }}
  >
    <Typography variant="h6" sx={{ mb: 2 }}>
      Desglose del precio
    </Typography>

    <Stack spacing={1.25} role="list">
      {result.lines.map((l, i) => (
        <Stack
          key={`${l.label}-${i}`}
          direction="row"
          justifyContent="space-between"
          role="listitem"
        >
          <Box sx={{ minWidth: 0, pr: 2 }}>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {l.label}
            </Typography>
            {l.detail && (
              <Typography variant="caption" color="text.secondary">
                {l.detail}
              </Typography>
            )}
          </Box>
          <Typography variant="body2" sx={{ fontWeight: 600, whiteSpace: 'nowrap' }}>
            {formatPEN(l.amount)}
          </Typography>
        </Stack>
      ))}
    </Stack>

    <Divider sx={{ my: 2 }} />

    <Stack direction="row" justifyContent="space-between">
      <Typography variant="body2" color="text.secondary">
        Subtotal
      </Typography>
      <Typography variant="body2">{formatPEN(result.subtotal)}</Typography>
    </Stack>
    <Stack direction="row" justifyContent="space-between" sx={{ mt: 0.5 }}>
      <Typography variant="body2" color="text.secondary">
        Impuestos y servicio
      </Typography>
      <Typography variant="body2">{formatPEN(result.taxes)}</Typography>
    </Stack>

    <Divider sx={{ my: 2 }} />

    <Stack direction="row" justifyContent="space-between" alignItems="baseline">
      <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
        Total
      </Typography>
      <Typography variant="h5" sx={{ fontWeight: 700, color: 'primary.main' }}>
        {formatPEN(result.total)}
      </Typography>
    </Stack>
    <Typography variant="caption" color="text.secondary">
      Precio referencial. Incluye {result.nights} noche{result.nights > 1 ? 's' : ''}.
    </Typography>
  </Paper>
);
