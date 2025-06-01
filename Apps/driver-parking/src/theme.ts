import { createTheme } from "@mui/material/styles"

const customTheme = createTheme({
  palette: {
    primary: {
      main: "#008343",
    },
  },
  typography: {
    fontFamily: `"Manrope", "Roboto", "Helvetica", sans-serif`,
    fontWeightMedium: 400, 
    fontWeightRegular: 400,  
    fontSize: 13, 
  },
})

export default customTheme