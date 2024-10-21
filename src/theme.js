import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  cssVariables: true,
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    text:{
      primary: '#000',
      secondary: '#898989'
    }
  },
  components:{
    MuiOutlinedInput:{
    }
  }
});

export default theme;