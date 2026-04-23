import { Box, Container, Grid, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import { SearchForm } from '@/components/quotation/SearchForm';
import { DESTINATIONS } from '@/data/destinations';
import { handleImageError } from '@/utils/image';
import { useQuotationStore } from '@/store/quotationStore';
import { useNotificationStore } from '@/store/notificationStore';
import { quote, QuotationError } from '@/services/quotationService';
import type { QuotationInput } from '@/types';

const HERO_IMG =
  'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=1800&q=80';

const Home = () => {
  const navigate = useNavigate();
  const setQuotation = useQuotationStore((s) => s.setQuotation);
  const notify = useNotificationStore((s) => s.notify);

  const handleSubmit = (input: QuotationInput) => {
    try {
      const result = quote(input);
      setQuotation(input, result);
      navigate('/results');
    } catch (err) {
      const message =
        err instanceof QuotationError ? err.message : 'No pudimos calcular tu viaje.';
      notify(message, 'error');
    }
  };

  return (
    <>
      <Box
        sx={{
          position: 'relative',
          minHeight: { xs: 520, md: 560 },
          backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.35), rgba(0,0,0,0.55)), url(${HERO_IMG})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'common.white',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Typography
              variant="h3"
              component="h1"
              sx={{ fontWeight: 700, maxWidth: 720 }}
            >
              Descubre Perú a tu medida
            </Typography>
            <Typography variant="h6" sx={{ mt: 1, opacity: 0.9, maxWidth: 640 }}>
              Cotiza pasajes, hoteles y actividades en segundos. Viaja con transparencia
              de precio y sin sorpresas.
            </Typography>
          </motion.div>

          <Box sx={{ mt: 4 }}>
            <SearchForm onSubmit={handleSubmit} submitLabel="Buscar" />
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 5, md: 8 } }}>
        <Stack direction="row" alignItems="baseline" justifyContent="space-between" sx={{ mb: 3 }}>
          <Typography variant="h4" component="h2">
            Destinos imperdibles
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Inspiración para tu próximo viaje
          </Typography>
        </Stack>

        <Grid container spacing={3}>
          {DESTINATIONS.map((d, i) => (
            <Grid item xs={12} sm={6} md={4} key={d.id}>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    borderRadius: 3,
                    overflow: 'hidden',
                    cursor: 'pointer',
                    height: 240,
                    '&:hover img': { transform: 'scale(1.05)' },
                  }}
                  onClick={() =>
                    handleSubmit({
                      originId: 'lim',
                      destinationId: d.id,
                      startDate: new Date(Date.now() + 14 * 864e5).toISOString().slice(0, 10),
                      endDate: new Date(Date.now() + 18 * 864e5).toISOString().slice(0, 10),
                      passengers: { adults: 2, children: 0 },
                      tripType: 'pasajes_hotel',
                      transport: d.planeBasePEN > 0 ? 'avion' : 'bus',
                      hotelStars: 4,
                      activityIds: [],
                    })
                  }
                  role="button"
                  tabIndex={0}
                  aria-label={`Cotizar viaje a ${d.name}`}
                >
                  <Box
                    component="img"
                    src={d.image}
                    alt={d.name}
                    loading="lazy"
                    onError={handleImageError(d.id, 1200, 800)}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform .4s',
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      background:
                        'linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.75) 100%)',
                      display: 'flex',
                      alignItems: 'flex-end',
                      p: 2.5,
                      color: 'common.white',
                    }}
                  >
                    <Box>
                      <Typography variant="overline" sx={{ opacity: 0.85 }}>
                        {d.region}
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        {d.name}
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.9 }}>
                        {d.description}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Home;
