import "./App.css";
import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";

import RegisterForm from "./components/Register/Register";
import Login from "./components/Login/Login";
import HomePage from "./components/HomePage/HomePage";
import Header from "./components/Header/Header";
import Alerts from "./components/Alerts/Alerts";
import Footer from "./components/Footer/Footer";
import Notes from "./components/Notes/Notes";
import AlertDialog from "./components/AlertDialog/AlertDialog";
import { lightTheme, darkTheme } from "./theme";

import API, { setAuthToken } from "./api/api";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [alertInfo, setAlertInfo] = useState({
    show: false,
    type: "",
    message: "",
  });
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthToken(token);
      API.get("/auth/validate-token", {
        headers: { Authorization: token },
      })
        .then((res) => {
          if (res.data.valid) {
            setIsLoggedIn(true);
            if (res.data.user) {
              setUser(res.data.user);
            }
          } else if (res.data.expired) {
            localStorage.removeItem("token");
            setDialogOpen(true);
            setIsLoggedIn(false);
          } else {
            localStorage.removeItem("token");
            setAuthToken(null);
            setIsLoggedIn(false);
          }
        })
        .catch(() => {
          localStorage.removeItem("token");
          setAuthToken(null);
          setIsLoggedIn(false);
        });
    } else {
      localStorage.removeItem("token");
      console.log("No token exists");
    }
  }, []);

  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <div className="App">
        <div className="content">
          <Header
            setIsDarkMode={setIsDarkMode}
            isDarkMode={isDarkMode}
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            setAlertInfo={setAlertInfo}
            user={user}
            setUser={setUser}
          />
          <AlertDialog dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/register"
              element={<RegisterForm setAlertInfo={setAlertInfo} />}
            />
            <Route
              path="/login"
              element={
                <Login
                  setIsLoggedIn={setIsLoggedIn}
                  setAlertInfo={setAlertInfo}
                  setUser={setUser}
                />
              }
            />
            <Route path="/my-tasks" element={<Notes user={user} />} />
            <Route path="/calendar" element={<h1>calendar</h1>} />
            {/* <Route path="/Chat" element={<h1>Chat</h1>} /> */}
          </Routes>
          <Alerts alertInfo={alertInfo} />
        </div>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
