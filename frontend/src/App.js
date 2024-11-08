import "./App.css";
import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";

import RegisterForm from "./components/Register/Register";
import Login from "./components/Login/Login";
import HomePage from "./components/HomePage/HomePage";
import Header from "./components/Header/Header";
import Greeting from "./components/Greeting/Greeting";
import Alerts from "./components/Alerts/Alerts";
import Footer from "./components/Footer/Footer";
import Notes from "./components/Notes/Notes";

function App() {
  /*
    importent: currently react refresh states each refresh, i need to set a login using cockies or some other secure way
    
  */

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [alertInfo, setAlertInfo] = useState({
    show: false,
    type: "",
    message: "",
  });

  const [user, setUser] = useState(null);

  return (
    <div className="App">
      <div className="content">
        <Header
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          setAlertInfo={setAlertInfo}
          user={user}
          setUser={setUser}
        />
        <Greeting user={user} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterForm />} />
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
          <Route path="/my-notes" element={<Notes />} />
          <Route path="/recommendations" element={<h1>recommendations</h1>} />
          <Route path="/Chat" element={<h1>Chat</h1>} />
        </Routes>
        <Alerts alertInfo={alertInfo} />
      </div>
      <Footer />
    </div>
  );
}

export default App;
