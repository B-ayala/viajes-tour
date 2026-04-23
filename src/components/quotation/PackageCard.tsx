import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  Typography,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { motion } from 'framer-motion';
import type { TravelPackage } from '@/types';
import { formatPEN } from '@/utils/formatters';
import { handleImageError } from '@/utils/image';

interface Props {
  pkg: TravelPackage;
  totalPEN: number;
  onClick: () => void;
  index?: number;
}

export const PackageCard = ({ pkg, totalPEN, onClick, index = 0 }: Props) => {
  const discounted = Math.round(totalPEN * (1 - pkg.discount));
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
    >
      <Card
        sx={{
          height: '100%',
          transition: 'transform .2s, box-shadow .2s',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 12px 32px rgba(0,0,0,0.12)',
          },
        }}
      >
        <CardActionArea onClick={onClick} aria-label={`Ver detalle de ${pkg.title}`}>
          <Box sx={{ position: 'relative' }}>
            <CardMedia
              component="img"
              image={pkg.image}
              alt={pkg.title}
              height={180}
              loading="lazy"
              onError={handleImageError(pkg.id, 1200, 600)}
              sx={{ objectFit: 'cover' }}
            />
            {pkg.discount > 0 && (
              <Chip
                label={`-${Math.round(pkg.discount * 100)}%`}
                color="primary"
                size="small"
                sx={{ position: 'absolute', top: 12, left: 12, fontWeight: 700 }}
              />
            )}
          </Box>
          <CardContent>
            <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mb: 0.5 }}>
              {Array.from({ length: pkg.hotelStars }).map((_, i) => (
                <StarIcon key={i} sx={{ fontSize: 16, color: 'secondary.main' }} />
              ))}
              <Typography variant="caption" color="text.secondary" sx={{ ml: 0.5 }}>
                {pkg.transport === 'avion' ? 'Vuelo incluido' : 'Bus incluido'}
              </Typography>
            </Stack>

            <Typography variant="h6" sx={{ fontSize: '1.05rem', lineHeight: 1.3 }}>
              {pkg.title}
            </Typography>

            <Stack direction="row" spacing={0.5} flexWrap="wrap" sx={{ mt: 1, rowGap: 0.5 }}>
              {pkg.highlights.slice(0, 3).map((h) => (
                <Chip key={h} label={h} size="small" variant="outlined" />
              ))}
            </Stack>

            <Stack direction="row" alignItems="baseline" spacing={1} sx={{ mt: 2 }}>
              {pkg.discount > 0 && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ textDecoration: 'line-through' }}
                >
                  {formatPEN(totalPEN)}
                </Typography>
              )}
              <Typography variant="h6" color="primary.main" sx={{ fontWeight: 700 }}>
                {formatPEN(discounted)}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                total
              </Typography>
            </Stack>
          </CardContent>
        </CardActionArea>
      </Card>
    </motion.div>
  );
};
