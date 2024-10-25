import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  cssVariables: true,
  palette: {
    primary: {
      main: '#FFF',
    },
    secondary: {
      main: '#ff8f00',
      contrastText: '#FFF'
    },
    error: {
      main: red.A400,
    },
    text:{
      primary: '#FFF',
      secondary: '#898989'
    },
    divider: '#424646',
    background:{
      default: '#111',
      paper: '#232323'
    }
  },
  typography: {
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 600,
    fontWeightBold: 700,
    h1: {
      fontSize: '32px'
    },
    h2: {
      fontSize: '28px'
    },
    h3: {
      fontSize: '24px'
    },
    h4: {
      fontSize: '20px'
    },
    h5: {
      fontSize: '18px'
    },
    h6: {
      fontSize: '16px'
    },
    body1: {
      fontSize: '0.875rem',
      fontWeight: 400
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400
    }
  },
  components:{
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          body1: 'div',
          body2: 'div'
        }
      },
    },
    MuiInputBase:{
      styleOverrides:{
        root: {
          background: '#232323'
        }
      }
    },
    MuiButton:{
      styleOverrides:{
        root: {
          textTransform: 'capitalize'
        }
      }
    },
    MuiChip:{
      styleOverrides:{
        root: {
          fontWegith: 600
        }
      }
    },
    MuiPaper:{
      styleOverrides:{
        root: {
          boxShadow: 'unset'
        }
      }
    }
  }
});

export default theme;