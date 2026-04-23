import { createTheme } from '@mui/material/styles';

/**
 * Theme centralizado. Ver .ai/ui-guidelines.md para justificación.
 */
export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#D32F2F',
      dark: '#9A0007',
      light: '#FF6659',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#F5B700',
      dark: '#BE8700',
      light: '#FFEA5C',
      contrastText: '#1A1A1A',
    },
    background: {
      default: '#FAFAFA',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1A1A1A',
      secondary: '#5F6368',
    },
    success: { main: '#2E7D32' },
    error: { main: '#C62828' },
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: "'Inter', -apple-system, Roboto, sans-serif",
    h1: { fontFamily: "'Poppins', sans-serif", fontWeight: 700 },
    h2: { fontFamily: "'Poppins', sans-serif", fontWeight: 700 },
    h3: { fontFamily: "'Poppins', sans-serif", fontWeight: 600 },
    h4: { fontFamily: "'Poppins', sans-serif", fontWeight: 600 },
    h5: { fontFamily: "'Poppins', sans-serif", fontWeight: 600 },
    h6: { fontFamily: "'Poppins', sans-serif", fontWeight: 600 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          paddingInline: 20,
          paddingBlock: 10,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
        },
      },
    },
    MuiTextField: {
      defaultProps: { size: 'small' },
    },
  },
});
