import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsLoggedIn, setAlertInfo, setUser, user }) => {
  const [userName, setuserName] = useState("");
  const [password, setPassword] = useState("");
  const [userNameError, setuserNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const navigate = useNavigate();

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
        console.log(response);
        if (response.data.result === "Signed in successfully!") {
          setAlertInfo({
            show: true,
            type: "success",
            message: "Signed in successfully!",
          });
          setTimeout(() => {
            setUser(response.data.user);
            setAlertInfo({ show: false });
            setIsLoggedIn(true);
            navigate("/");
          }, 3000);
        } else {
          setAlertInfo({
            show: true,
            type: "error",
            message: response.data.result,
          });
          setTimeout(() => {
            setAlertInfo({ show: false });
          }, 3000);
        }
      } catch (error) {
        console.error("There was an error creating the task!", error);
      }
    }
  };

  return (
    <div className="form-container">
      <form autoComplete="off" onSubmit={handleSubmit}>
        <Typography variant="h4" sx={{ m: 4 }}>
          Login
        </Typography>
        <TextField
          label="User Name"
          onChange={(e) => setuserName(e.target.value)}
          required
          variant="outlined"
          color="secondary"
          type="userName"
          sx={{ mb: 2 }}
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
          sx={{ mb: 2 }}
        />
        <Button
          variant="outlined"
          color="secondary"
          type="submit"
          sx={{ mt: 2 }}
        >
          Login
        </Button>
      </form>
      <Typography variant="subtitle2" sx={{ m: 4 }}>
        Need an account? <Link to="/register">Register here</Link>
      </Typography>
    </div>
  );
};

export default Login;
