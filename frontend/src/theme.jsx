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
  shadows: [
    "none",
    "0px 1px 3px rgba(255, 255, 255, 0.08)",
    "0px 1px 5px rgba(255, 255, 255, 0.1)",
    "0px 1px 8px rgba(255, 255, 255, 0.12)",
    "0px 2px 4px rgba(255, 255, 255, 0.14)",
    "0px 3px 5px rgba(255, 255, 255, 0.16)",
    "0px 4px 8px rgba(255, 255, 255, 0.18)",
    "0px 5px 10px rgba(255, 255, 255, 0.2)",
    "0px 6px 12px rgba(255, 255, 255, 0.22)",
    "0px 7px 14px rgba(255, 255, 255, 0.24)",
    "0px 8px 16px rgba(255, 255, 255, 0.26)",
    "0px 9px 18px rgba(255, 255, 255, 0.28)",
    "0px 10px 20px rgba(255, 255, 255, 0.3)",
    "0px 11px 22px rgba(255, 255, 255, 0.32)",
    "0px 12px 24px rgba(255, 255, 255, 0.34)",
    "0px 13px 26px rgba(255, 255, 255, 0.36)",
    "0px 14px 28px rgba(255, 255, 255, 0.38)",
    "0px 15px 30px rgba(255, 255, 255, 0.4)",
    "0px 16px 32px rgba(255, 255, 255, 0.42)",
    "0px 17px 34px rgba(255, 255, 255, 0.44)",
    "0px 18px 36px rgba(255, 255, 255, 0.46)",
    "0px 19px 38px rgba(255, 255, 255, 0.48)",
    "0px 20px 40px rgba(255, 255, 255, 0.5)",
    "0px 21px 42px rgba(255, 255, 255, 0.52)",
    "0px 22px 44px rgba(255, 255, 255, 0.54)",
  ],
});
