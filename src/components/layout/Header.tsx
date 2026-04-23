import { AppBar, Badge, Box, Container, IconButton, Toolbar, Typography } from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useCartStore } from '@/store/cartStore';

export const Header = () => {
  const count = useCartStore((s) => s.items.length);
  const navigate = useNavigate();

  return (
    <AppBar
      position="sticky"
      elevation={0}
      color="default"
      sx={{
        bgcolor: 'background.paper',
        borderBottom: (t) => `1px solid ${t.palette.divider}`,
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ gap: 2 }}>
          <Box
            component={RouterLink}
            to="/"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              textDecoration: 'none',
              color: 'primary.main',
            }}
            aria-label="Ir al inicio"
          >
            <Box
              sx={{
                width: 32,
                height: 32,
                bgcolor: 'primary.main',
                borderRadius: 1.5,
                display: 'grid',
                placeItems: 'center',
                color: 'common.white',
                fontWeight: 700,
              }}
            >
              Y
            </Box>
            <Typography variant="h6" component="span" sx={{ fontFamily: "'Poppins'" }}>
              Yopi <Box component="span" sx={{ color: 'text.primary' }}>Travel</Box>
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          <IconButton
            onClick={() => navigate('/cart')}
            aria-label={`Carrito con ${count} elemento${count === 1 ? '' : 's'}`}
          >
            <Badge badgeContent={count} color="primary">
              <ShoppingCartOutlinedIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
