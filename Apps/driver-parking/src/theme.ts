import { createTheme } from "@mui/material/styles"

const customTheme = createTheme({
  palette: {
    primary: {
      main: "#008343",
    },
  },
  typography: {
    fontFamily: `"Manrope", "Roboto", "Helvetica", sans-serif`,
  },
})

export default customTheme