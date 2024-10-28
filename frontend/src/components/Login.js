import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [userName, setuserName] = useState("");
  const [password, setPassword] = useState("");
  const [userNameError, setuserNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setuserNameError(false);
    setPasswordError(false);

    if (userName === "") {
      setuserNameError(true);
    }
    if (password === "") {
      setPasswordError(true);
    }

    if (userName && password) {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/users/" + userName,
          {
            params: {
              password: password,
            },
          }
        );
        console.log(response.data);
      } catch (error) {
        console.error("There was an error creating the task!", error);
      }
    }
  };

  return (
    <React.Fragment>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <h2>Login Form</h2>
        <TextField
          label="User Name"
          onChange={(e) => setuserName(e.target.value)}
          required
          variant="outlined"
          color="secondary"
          type="userName"
          sx={{ mb: 3 }}
          fullWidth
          value={userName}
          error={userNameError}
        />
        <TextField
          label="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
          variant="outlined"
          color="secondary"
          type="password"
          value={password}
          error={passwordError}
          fullWidth
          sx={{ mb: 3 }}
        />
        <Button variant="outlined" color="secondary" type="submit">
          Login
        </Button>
      </form>
      <small>
        Need an account? <Link to="/">Register here</Link>
      </small>
    </React.Fragment>
  );
};

export default Login;
