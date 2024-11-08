import React, { useEffect, useState } from "react";
import { Typography, Box } from "@mui/material";
import Divider from "@mui/material/Divider";

import "./Greeting.css";

const Greeting = ({ user }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [message, setMessage] = useState("Welcome ");
  useEffect(() => {
    const getCurrentHourOfDay = () => {
      const currentHours = new Date().getHours();
      if (!user) {
        return;
      }
      if (currentHours >= 5 && currentHours < 12) {
        setMessage(
          "Good Morning " + user.username + "! Have a productive day."
        );
      } else if (currentHours >= 12 && currentHours < 16) {
        setMessage("Good Noon " + user.username + ". Bon appetit.");
      } else if (currentHours >= 16 && currentHours < 20) {
        setMessage("Great AfterNoon " + user.username + "! Coffee time!");
      } else {
        setMessage("Good night " + user.username + ". Time to sleep!");
      }
    };
    const updateClock = () => {
      setCurrentTime(new Date());
    };
    getCurrentHourOfDay();
    const intervalId = setInterval(() => {
      updateClock();
    }, 1000);

    return () => clearInterval(intervalId);
  }, [user]);

  return (
    <Box className="sub-header">
      <Typography variant="h4" className="clock">
        {currentTime.toLocaleTimeString()}
      </Typography>
      <Typography variant="h5" className="greeting">
        {user
          ? message
          : "Great to see you! Feel free signing up and experiencing my work!"}
      </Typography>
      <Box className="test">
        <Divider orientation="horizontal" flexItem className="test" />
      </Box>
    </Box>
  );
};

export default Greeting;
