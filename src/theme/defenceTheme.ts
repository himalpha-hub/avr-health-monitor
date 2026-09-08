import { createTheme } from "@mui/material/styles";

export const defenceTheme = createTheme({
  palette: {
    mode: "light",

    primary: {
      main: "#0F4C81",
    },

    success: {
      main: "#2E7D32",
    },

    warning: {
      main: "#ED6C02",
    },

    error: {
      main: "#C62828",
    },

    background: {
      default: "#EEF2F6",
      paper: "#FFFFFF",
    },
  },

  typography: {
    fontFamily: "Segoe UI, Arial, sans-serif",

    h4: {
      fontWeight: 700,
    },

    h5: {
      fontWeight: 700,
    },

    h6: {
      fontWeight: 600,
    },
  },

  shape: {
    borderRadius: 6,
  },
});