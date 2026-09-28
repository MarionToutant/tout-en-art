import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#d6533c',
    },
    secondary: {
      main: '#57836c',
    },
    background: {
      default: '#f4f5ef',
      paper: '#fbfcf7',
    },
    text: {
      primary: '#202b25',
      secondary: '#66716a',
    },
  },
  typography: {
    fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    h1: {
      fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      fontSize: '2.5rem',
      fontWeight: 300,
      lineHeight: 1,
      letterSpacing: 0,
    },
  },
});
