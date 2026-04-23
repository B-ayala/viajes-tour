import { Box, CircularProgress } from '@mui/material';

export const PageLoader = () => (
  <Box
    sx={{
      display: 'grid',
      placeItems: 'center',
      minHeight: '40vh',
    }}
    role="status"
    aria-label="Cargando"
  >
    <CircularProgress color="primary" />
  </Box>
);
