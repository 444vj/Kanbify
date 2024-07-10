import { createTheme } from "@mui/material";
import { dark } from "@mui/material/styles/createPalette";

export const colors = [
  "#ffadad",
  "#ffd6a5",
  "#fdffb6",
  "#caffbf",
  "#9bf6ff",
  "#a0c4ff",
  "#bdb2ff",
  "#ffc6ff",
  "#fffffc"

];


const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#1D1F26",
    },
    primary:{
      main: "#BEA4FF",
    }
  },
  typography:{
    fontFamily:'Lato, sans-serif',
    button:{
      textTransform: 'unset',
      fontWeight: 700,
    },
    h5:{
      fontWeight: 700
    },
    h6:{
      fontWeight: 700
    }
  },
  shape:{
    borderRadius: 0
  },
  components:{
    MuiSnackbar:{
      defaultProps:{
        anchorOrigin:{
          vertical: "top",
          horizontal: "center"
        }
      },
      
    },
    MuiSnackbarContent:{
      styleOverrides:{
        message: {
          fontWeight: 600,
          textTransform: "capitalize",
        }
      }
    },
    MuiIconButton:{
      defaultProps:{
        size: 'small'
      }
    }
  }
});

export default theme;
