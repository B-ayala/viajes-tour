import { Box, Chip, Stack, Typography } from '@mui/material';
import type { Activity } from '@/types';
import { formatPEN } from '@/utils/formatters';

interface Props {
  activities: Activity[];
  selected: string[];
  onToggle: (id: string) => void;
}

export const ActivityPicker = ({ activities, selected, onToggle }: Props) => {
  if (activities.length === 0) return null;
  return (
    <Box>
      <Typography variant="subtitle2" sx={{ mb: 1 }}>
        Actividades opcionales
      </Typography>
      <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ rowGap: 1 }}>
        {activities.map((a) => {
          const isSelected = selected.includes(a.id);
          return (
            <Chip
              key={a.id}
              label={`${a.name} · ${formatPEN(a.pricePEN)}`}
              color={isSelected ? 'primary' : 'default'}
              variant={isSelected ? 'filled' : 'outlined'}
              onClick={() => onToggle(a.id)}
              aria-pressed={isSelected}
              sx={{ fontWeight: 500 }}
            />
          );
        })}
      </Stack>
    </Box>
  );
};
