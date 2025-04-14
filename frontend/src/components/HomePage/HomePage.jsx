import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { AccountButton } from "../AccountButton/AccountButton";
import Grow from "@mui/material/Grow";

const Introduction = () => {
  return (
    <Box
      display="flex"
      flexDirection="row"
      sx={{ width: "65%", height: "50%" }}
    >
      <Box
        sx={{
          justifyContent: "center",
          alignItems: "left",
          display: "flex",
          flexDirection: "column",
          width: "50%",
        }}
      >
        <Typography variant="h3" sx={{ mb: 2, ml: 0 }}>
          Welcome to TaskIt!
        </Typography>
        <Typography variant="subtitle2" component="h5" sx={{ fontSize: 18 }}>
          This is my first fullstack project using MUI, Java SpringBoot, and
          MySQL.
        </Typography>
        <Typography variant="subtitle2" component="h5" sx={{ fontSize: 18 }}>
          Using Bcrypt, JWT, and Spring Security for authentication.
        </Typography>
        <AccountButton
          variant="contained"
          href="/register"
          sx={{
            m: 0,
            mt: 10,
            width: "60%",
            height: 50,
            alignItems: "center",
            fontSize: 16,
            fontWeight: 700,
          }}
        >
          Create your account here!
        </AccountButton>
      </Box>
      <Grow in style={{ transformOrigin: "0 0 0" }} timeout={1000}>
        <Box
          component="img"
          src="/assets/IntroductionImage.png"
          alt="TaskIt Illustration"
          sx={{
            width: "35%",
            height: "120%",
            objectFit: "cover",
            ml: 10,
            borderRadius: "20px",
            boxShadow: 3,
          }}
        />
      </Grow>
    </Box>
  );
};

const HomePage = () => {
  const boxStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "80vh",
  };

  return (
    <>
      <Box sx={boxStyle}>{Introduction()}</Box>
      <Box sx={boxStyle}></Box>
      <Box sx={boxStyle}></Box>
    </>
  );
};

export default HomePage;
