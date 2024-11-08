import React, { useState, useEffect } from "react";
import "./Alerts.css";
import { Alert, AlertTitle } from "@mui/material";

const Alerts = ({ alertInfo }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="alerts">
      {alertInfo.show && (
        <Alert
          severity={alertInfo.type}
          sx={{
            fontWeight: "bold",
            fontSize: 16,
            width: windowWidth > 900 ? 700 : 400,
          }}
        >
          <AlertTitle sx={{ fontWeight: "bold", fontSize: 18 }}>
            {alertInfo.type.charAt(0).toUpperCase() + alertInfo.type.slice(1)}
          </AlertTitle>
          {alertInfo.message}
        </Alert>
      )}
    </div>
  );
};

export default Alerts;
