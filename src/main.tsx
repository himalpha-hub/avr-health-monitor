import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { defenceTheme } from "./theme/defenceTheme";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={defenceTheme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);