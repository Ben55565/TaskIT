import { createTheme } from "@mui/material";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#F8F8F8",
      paper: "#FFFFFF",
    },
    primary: {
      main: "#77ABB6",
    },
    secondary: {
      main: "#3FC495",
    },
  },
  text: {
    primary: "#1B1B1B",
    secondary: "#F8B097",
    hover: "#8adbbf",
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#121212",
      paper: "#1E1E1E",
    },
    primary: {
      main: "#77ABB6",
    },
    secondary: {
      main: "#3FC495",
    },
  },
  text: {
    primary: "#FFFFFF",
    secondary: "#F8B097",
    hover: "#8adbbf",
  },
});
