import React, { useState } from "react";
import { TextField, Button, Stack, Typography } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import "./Register.css";
import axios from "axios";

const RegisterForm = ({ setAlertInfo }) => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setuserName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNum, setphoneNum] = useState("");
  const [password, setPassword] = useState("");

  const [usernameError, setUsernameError] = useState(false);
  const [phoneNumError, setPhoneNumError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const handleSubmit = async (e) => {
    setUsernameError(false);
    setPhoneNumError(false);
    setEmailError(false);
    e.preventDefault();

    const user = {
      firstName: firstName,
      lastName: lastName,
      username: userName,
      email: email,
      phone_number: phoneNum,
      password: password,
    };
    // Check for json file for configurations, for the axios requests for the backend,
    // for example - save there the host "http://localhost:8080" instead of dulicating in each request

    try {
      await axios.post("http://localhost:8080/api/users", user);

      setAlertInfo({
        show: true,
        type: "success",
        message: "Created user successfully!",
      });

      setTimeout(() => {
        setAlertInfo({ show: false });
        navigate("/login");
      }, 3000);
    } catch (error) {
      if (error.response) {
        const errorType = error.response.data?.error;
        let errorMessage;
        if (errorType === "usernameError") {
          setUsernameError(true);
          errorMessage = "Username is taken. Please choose new username.";
        } else if (errorType === "phonenumError") {
          setPhoneNumError(true);
          errorMessage =
            "Phone number is already registered. Please register new number.";
        } else if (errorType === "emailError") {
          setEmailError(true);
          errorMessage =
            "Email is already registered. Please register a new email address.";
        }
        setAlertInfo({
          show: true,
          type: "error",
          message: errorMessage,
        });

        setTimeout(() => {
          setAlertInfo({ show: false });
        }, 3000);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error in request setup:", error.message);
      }
    }
  };

  return (
    <div className="form-container">
      <Typography variant="h4" sx={{ m: 4 }}>
        Sign-up
      </Typography>
      <form onSubmit={handleSubmit} action={<Link to="/login" />}>
        <Stack spacing={2} direction="row" sx={{ mb: 2 }}>
          <TextField
            type="text"
            variant="outlined"
            color="secondary"
            label="First Name"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
            fullWidth
            required
          />
          <TextField
            type="text"
            variant="outlined"
            color="secondary"
            label="Last Name"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
            fullWidth
            required
          />
        </Stack>
        <TextField
          error={usernameError}
          type="text"
          variant="outlined"
          color="secondary"
          label="Username"
          onChange={(e) => setuserName(e.target.value)}
          value={userName}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <TextField
          error={emailError}
          type="text"
          variant="outlined"
          color="secondary"
          label="Email"
          helperText="Required format: aaa@bbb.com"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <TextField
          error={phoneNumError}
          type="tel"
          variant="outlined"
          color="secondary"
          label="Phone number"
          helperText="Required format: +xxxxxxxx"
          onChange={(e) => setphoneNum(e.target.value)}
          value={phoneNum}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          type="password"
          variant="outlined"
          color="secondary"
          label="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
          fullWidth
          sx={{ mb: 2 }}
        />
        <Button
          variant="outlined"
          color="secondary"
          type="submit"
          sx={{ mt: 2 }}
        >
          Register
        </Button>
      </form>
      <Typography variant="subtitle2" sx={{ m: 4 }}>
        Already have an account? <Link to="/login">Login Here</Link>
      </Typography>
    </div>
  );
};

export default RegisterForm;
