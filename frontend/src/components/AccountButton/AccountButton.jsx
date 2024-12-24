import { Button, styled } from "@mui/material";

export const AccountButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  color: theme.text.primary,
  fontSize: 14,
  margin: 5,
  borderRadius: 30,
  "&:hover": {
    backgroundColor: theme.text.hover,
  },
}));
