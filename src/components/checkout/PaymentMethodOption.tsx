import { Avatar, Box, Paper, Radio, Stack, Typography } from '@mui/material';
import type { PaymentMethod } from '@/data/paymentMethods';

interface Props {
  method: PaymentMethod;
  selected: boolean;
  onSelect: () => void;
}

export const PaymentMethodOption = ({ method, selected, onSelect }: Props) => (
  <Paper
    variant="outlined"
    onClick={onSelect}
    role="radio"
    aria-checked={selected}
    tabIndex={0}
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onSelect();
      }
    }}
    sx={{
      p: 1.5,
      cursor: 'pointer',
      borderColor: selected ? 'primary.main' : 'divider',
      borderWidth: selected ? 2 : 1,
      bgcolor: selected ? 'rgba(211,47,47,0.04)' : 'background.paper',
      transition: 'all .15s',
      '&:hover': { borderColor: 'primary.light' },
    }}
  >
    <Stack direction="row" spacing={1.5} alignItems="center">
      <Radio checked={selected} color="primary" size="small" sx={{ p: 0.5 }} />
      <Avatar
        sx={{
          bgcolor: method.color,
          width: 40,
          height: 40,
          fontWeight: 700,
          fontSize: '0.95rem',
        }}
      >
        {method.initials}
      </Avatar>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          {method.name}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {method.description}
        </Typography>
      </Box>
      {method.issuer && (
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: { xs: 'none', sm: 'block' }, whiteSpace: 'nowrap' }}
        >
          {method.issuer}
        </Typography>
      )}
    </Stack>
  </Paper>
);
