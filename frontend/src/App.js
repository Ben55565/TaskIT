import "./App.css";
import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";

import RegisterForm from "./components/Register/Register";
import Login from "./components/Login/Login";
import HomePage from "./components/HomePage/HomePage";
import Header from "./components/Header/Header";

function App() {
  /*
  The pages i want to have in my site:
  1. main page that lets you register or sign in (maybe add memoryless option)
  2. user settings
  3. 

  the first thing i want to do is make a sign up form and make it work with the backend
  */

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="App">
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />
      </Routes>
    </div>
  );
}

export default App;
