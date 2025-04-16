import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { AccountButton } from "../AccountButton/AccountButton";
import Grow from "@mui/material/Grow";
import { useInView } from "react-intersection-observer";

const Introduction = () => {
  return (
    <Box
      display="flex"
      flexDirection="row"
      sx={{ width: "95%", height: "100%", mt: 10, minHeight: "60vh" }}
      boxShadow={8}
      alignItems="center"
      justifyContent="center"
    >
      <Box
        sx={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          ml: 30,
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
            mt: 5,
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
        <Box>
          <Box
            component="img"
            src="/assets/IntroductionImage.png"
            alt="TaskIt Illustration"
            sx={{
              width: "50%",
              height: "80%",
              objectFit: "cover",
              borderRadius: "20px",
              boxShadow: 3,
              ml: 20,
            }}
          />
        </Box>
      </Grow>
    </Box>
  );
};

const Information = () => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  const [visible, setVisible] = useState([false, false, false]);

  useEffect(() => {
    if (inView) {
      const timeouts = [
        setTimeout(() => setVisible([true, false, false]), 100),
        setTimeout(() => setVisible([true, true, false]), 600),
        setTimeout(() => setVisible([true, true, true]), 1100),
      ];
      return () => timeouts.forEach((t) => clearTimeout(t));
    } else {
      setVisible([false, false, false]);
    }
  }, [inView]);

  return (
    <Box
      display="flex"
      flexDirection="row"
      sx={{ width: "95%", height: "100%", mt: 15, minHeight: "60vh" }}
      boxShadow={8}
      alignItems="center"
      justifyContent="center"
      ref={ref}
    >
      <Grow in={visible[0]} style={{ transformOrigin: "0 0 0" }} timeout={500}>
        <Box
          sx={{
            m: 5,
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{ fontSize: 20, mb: 5, textAlign: "center", width: "70%" }}
          >
            Create and track you daily tasks with ease, all in one place. WIP:
            Recive notifications when tasks are due via email or SMS!
          </Typography>
          <Box
            component="video"
            autoPlay
            loop
            src="/assets/Sponge.mp4"
            alt="Spongebob party tasks"
            sx={{
              objectFit: "fill",
              borderRadius: "20px",
              maxHeight: "50%",
              maxWidth: "80%",
            }}
          />
        </Box>
      </Grow>
      <Grow in={visible[1]} style={{ transformOrigin: "0 0 0" }} timeout={500}>
        <Box
          sx={{
            m: 5,
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <Box
            component="img"
            autoPlay
            loop
            src="/assets/taskAnime.gif"
            alt="Task animation"
            sx={{
              objectFit: "cover",
              minWidth: "35%",
              minHeight: "35%",
            }}
          />
          <Typography
            variant="subtitle2"
            sx={{ fontSize: 20, mt: 5, textAlign: "center", width: "70%" }}
          >
            Add recurring tasks to your daily routine, and never forget a task
            and when its due! Set timer for each task, and get notified when the
            time is up such as replacing bed sheets.
          </Typography>
        </Box>
      </Grow>
      <Grow in={visible[2]} style={{ transformOrigin: "0 0 0" }} timeout={500}>
        <Box
          sx={{
            m: 5,
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{ fontSize: 20, mb: 5, textAlign: "center", width: "70%" }}
          >
            Keep track of your habits using tracker. Want to improve on your
            skills and break the process into tasks? Use Taskit habit tracker!
          </Typography>
          <Box
            component="img"
            autoPlay
            loop
            src="/assets/Penguin.gif"
            alt="Task animation"
            sx={{
              objectFit: "fill",
              borderRadius: "20px",
              maxHeight: "50%",
              maxWidth: "80%",
            }}
          />
        </Box>
      </Grow>
    </Box>
  );
};

const PlaceHolder = () => {
  return (
    <Box
      display="flex"
      flexDirection="row"
      sx={{
        width: "95%",
        mt: 15,
        minHeight: "60vh",
        mb: 15,
      }}
      boxShadow={8}
      alignItems="center"
      justifyContent="center"
    >
      <Typography variant="h4">Placeholder</Typography>
    </Box>
  );
};

const HomePage = () => {
  const boxStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <>
      <Box sx={boxStyle}>{Introduction()}</Box>
      <Box sx={boxStyle}>{Information()}</Box>
      <Box sx={boxStyle}>{PlaceHolder()}</Box>
    </>
  );
};

export default HomePage;
