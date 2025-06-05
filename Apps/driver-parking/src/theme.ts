import { createTheme } from "@mui/material/styles"

const customTheme = createTheme({
  palette: {
    primary: {
      main: "#008343",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#FFD700",
    },
  background: {
      default: "#f8f8f8", // Off-white background
  },
  },
  typography: {
    fontFamily: `"Manrope", "Roboto", "Helvetica", sans-serif`,
    fontWeightMedium: 400, 
    fontWeightRegular: 400,  
    fontSize: 13, 
  },
  components: {
    MuiCssBaseline: {
},
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        }
      }
    }
  }
})

export default customTheme