import React from "react";
import "./Alerts.css";
import { Alert, AlertTitle } from "@mui/material";

const Alerts = ({ alertInfo }) => {
  return (
    <div
      className="alerts"
      style={{
        position: "fixed",
        bottom: 10,
        left: 300,
        zIndex: 1300,
      }}
    >
      {alertInfo.show && (
        <Alert
          severity={alertInfo.type}
          sx={{
            fontWeight: "bold",
            fontSize: 16,
            width: 400,
            borderRadius: 10,
            boxShadow: 1,
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
