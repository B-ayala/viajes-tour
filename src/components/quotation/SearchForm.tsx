import { useState } from 'react';
import {
  Box,
  Button,
  Grid,
  MenuItem,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  Stack,
  IconButton,
} from '@mui/material';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { type Dayjs } from 'dayjs';

import { DESTINATIONS, ORIGINS } from '@/data/destinations';
import type {
  HotelStars,
  QuotationInput,
  TransportType,
  TripType,
} from '@/types';

interface Props {
  onSubmit: (input: QuotationInput) => void;
  initial?: Partial<QuotationInput>;
  submitLabel?: string;
  dense?: boolean;
}

const todayPlus = (days: number): Dayjs => dayjs().add(days, 'day');

export const SearchForm = ({ onSubmit, initial, submitLabel = 'Cotizar', dense }: Props) => {
  const [originId, setOriginId] = useState(initial?.originId ?? 'lim');
  const [destinationId, setDestinationId] = useState(initial?.destinationId ?? 'cusco');
  const [startDate, setStartDate] = useState<Dayjs>(
    initial?.startDate ? dayjs(initial.startDate) : todayPlus(14),
  );
  const [endDate, setEndDate] = useState<Dayjs>(
    initial?.endDate ? dayjs(initial.endDate) : todayPlus(18),
  );
  const [adults, setAdults] = useState(initial?.passengers?.adults ?? 2);
  const [children, setChildren] = useState(initial?.passengers?.children ?? 0);
  const [tripType, setTripType] = useState<TripType>(initial?.tripType ?? 'pasajes_hotel');
  const [transport, setTransport] = useState<TransportType>(initial?.transport ?? 'avion');
  const [hotelStars, setHotelStars] = useState<HotelStars>(initial?.hotelStars ?? 4);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      originId,
      destinationId,
      startDate: startDate.format('YYYY-MM-DD'),
      endDate: endDate.format('YYYY-MM-DD'),
      passengers: { adults, children },
      tripType,
      transport,
      hotelStars: tripType === 'pasajes_hotel' ? hotelStars : undefined,
      activityIds: initial?.activityIds ?? [],
    });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        bgcolor: 'background.paper',
        color: 'text.primary',
        p: { xs: 2, sm: 3 },
        borderRadius: 3,
        boxShadow: dense ? 0 : '0 10px 40px rgba(0,0,0,0.12)',
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            select
            fullWidth
            label="Origen"
            value={originId}
            onChange={(e) => setOriginId(e.target.value)}
          >
            {ORIGINS.map((o) => (
              <MenuItem key={o.id} value={o.id}>
                {o.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <TextField
            select
            fullWidth
            label="Destino"
            value={destinationId}
            onChange={(e) => setDestinationId(e.target.value)}
          >
            {DESTINATIONS.map((d) => (
              <MenuItem key={d.id} value={d.id}>
                {d.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={6} md={3}>
          <DatePicker
            label="Ida"
            value={startDate}
            onChange={(v) => v && setStartDate(v)}
            minDate={dayjs()}
            slotProps={{ textField: { fullWidth: true, size: 'small' } }}
          />
        </Grid>

        <Grid item xs={6} md={3}>
          <DatePicker
            label="Vuelta"
            value={endDate}
            onChange={(v) => v && setEndDate(v)}
            minDate={startDate.add(1, 'day')}
            slotProps={{ textField: { fullWidth: true, size: 'small' } }}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <PassengerStepper label="Adultos" min={1} value={adults} onChange={setAdults} />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <PassengerStepper label="Niños" min={0} value={children} onChange={setChildren} />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="caption" color="text.secondary">
            Tipo de viaje
          </Typography>
          <ToggleButtonGroup
            value={tripType}
            exclusive
            onChange={(_, v) => v && setTripType(v)}
            size="small"
            fullWidth
            sx={{ mt: 0.5 }}
          >
            <ToggleButton value="pasajes">Solo pasajes</ToggleButton>
            <ToggleButton value="pasajes_hotel">Pasajes + hotel</ToggleButton>
          </ToggleButtonGroup>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="caption" color="text.secondary">
            Transporte
          </Typography>
          <ToggleButtonGroup
            value={transport}
            exclusive
            onChange={(_, v) => v && setTransport(v)}
            size="small"
            fullWidth
            sx={{ mt: 0.5 }}
          >
            <ToggleButton value="avion" aria-label="Avión">
              <FlightTakeoffIcon fontSize="small" sx={{ mr: 1 }} /> Avión
            </ToggleButton>
            <ToggleButton value="bus" aria-label="Bus">
              <DirectionsBusIcon fontSize="small" sx={{ mr: 1 }} /> Bus
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid>

        {tripType === 'pasajes_hotel' && (
          <Grid item xs={12} md={6}>
            <Typography variant="caption" color="text.secondary">
              Categoría de hotel
            </Typography>
            <ToggleButtonGroup
              value={hotelStars}
              exclusive
              onChange={(_, v) => v && setHotelStars(v)}
              size="small"
              fullWidth
              sx={{ mt: 0.5 }}
            >
              <ToggleButton value={3}>3★</ToggleButton>
              <ToggleButton value={4}>4★</ToggleButton>
              <ToggleButton value={5}>5★</ToggleButton>
            </ToggleButtonGroup>
          </Grid>
        )}

        <Grid item xs={12}>
          <Stack direction="row" justifyContent="flex-end">
            <Button type="submit" variant="contained" size="large" sx={{ minWidth: 180 }}>
              {submitLabel}
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

interface StepperProps {
  label: string;
  value: number;
  min?: number;
  max?: number;
  onChange: (n: number) => void;
}

const PassengerStepper = ({ label, value, min = 0, max = 9, onChange }: StepperProps) => (
  <Box>
    <Typography variant="caption" color="text.secondary">
      {label}
    </Typography>
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{
        mt: 0.5,
        border: (t) => `1px solid ${t.palette.divider}`,
        borderRadius: 1,
        px: 1,
        py: 0.5,
      }}
    >
      <IconButton
        type="button"
        size="small"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label={`Quitar ${label.toLowerCase()}`}
      >
        <RemoveIcon fontSize="small" />
      </IconButton>
      <Typography sx={{ fontWeight: 600, color: 'text.primary', minWidth: 24, textAlign: 'center' }}>
        {value}
      </Typography>
      <IconButton
        type="button"
        size="small"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label={`Agregar ${label.toLowerCase()}`}
      >
        <AddIcon fontSize="small" />
      </IconButton>
    </Stack>
  </Box>
);
