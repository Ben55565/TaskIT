import React, { useEffect, useState } from "react";
import { Typography, Box } from "@mui/material";
import Divider from "@mui/material/Divider";

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
    <Box sx={{ pt: 4, textAlign: "center" }}>
      <Typography
        variant="body2"
        className="clock"
        sx={{ fontWeight: 700, fontSize: 18 }}
      >
        {currentTime.toLocaleTimeString()}
      </Typography>
      <Typography variant="body1" sx={{ fontWeight: 400, pt: 1, pb: 3 }}>
        {user
          ? message
          : "Great to see you! Feel free signing up and experiencing my work!"}
      </Typography>
      <Box>
        <Divider orientation="horizontal" flexItem className="test" />
      </Box>
    </Box>
  );
};

export default Greeting;
