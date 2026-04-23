import { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { NotificationHost } from '@/components/common/NotificationHost';
import { PageLoader } from '@/components/common/PageLoader';

const Home = lazy(() => import('@/pages/Home'));
const Results = lazy(() => import('@/pages/Results'));
const PackageDetail = lazy(() => import('@/pages/PackageDetail'));
const Cart = lazy(() => import('@/pages/Cart'));
const Checkout = lazy(() => import('@/pages/Checkout'));

const App = () => (
  <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100dvh' }}>
    <Header />
    <Box component="main" sx={{ flex: 1 }}>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/results" element={<Results />} />
          <Route path="/package/:id" element={<PackageDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </Box>
    <Footer />
    <NotificationHost />
  </Box>
);

export default App;
