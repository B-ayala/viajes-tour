import { Box, Container, Typography, Stack, Link } from '@mui/material';

export const Footer = () => (
  <Box
    component="footer"
    sx={{
      mt: 8,
      py: 4,
      bgcolor: 'primary.main',
      color: 'primary.contrastText',
    }}
  >
    <Container maxWidth="lg">
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        justifyContent="space-between"
        alignItems={{ sm: 'center' }}
      >
        <Typography variant="body2">
          © {new Date().getFullYear()} Yopi Travel · Descubre Perú
        </Typography>
        <Stack direction="row" spacing={3}>
          <Link href="#" color="inherit" underline="hover">
            Términos
          </Link>
          <Link href="#" color="inherit" underline="hover">
            Privacidad
          </Link>
          <Link href="#" color="inherit" underline="hover">
            Contacto
          </Link>
        </Stack>
      </Stack>
    </Container>
  </Box>
);
