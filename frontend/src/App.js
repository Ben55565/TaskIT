import "./App.css";
import React from "react";
import { Route, Routes } from "react-router-dom";

import { AppBar, Toolbar } from "@mui/material";
import { Container } from "@mui/system";

import RegisterForm from "./components/Register";
import Login from "./components/Login";

function App() {
  /*
  The pages i want to have in my site:
  1. main page that lets you register or sign in (maybe add memoryless option)
  2. user settings
  3. 

  the first thing i want to do is make a sign up form and make it work with the backend
  */
  return (
    <div className="App">
      <AppBar position="fixed">
        <Toolbar>TaskIT!</Toolbar>
      </AppBar>
      <Container />
      <Routes>
        <Route path="/" element={<RegisterForm />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
