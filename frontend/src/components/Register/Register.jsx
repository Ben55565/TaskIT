import React, { useState } from "react";
import { TextField, Button, Stack } from "@mui/material";
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
      const response = await axios.post(
        "http://localhost:8080/api/users",
        user
      );
      console.log(response);
      setAlertInfo({
        show: true,
        type: "success",
        message: "Created user successfully!",
      });

      setTimeout(() => {
        setAlertInfo({ show: false });
        navigate("/login");
      }, 3000);
      console.log(setAlertInfo);
    } catch (error) {
      if (error.response) {
        const errorType = error.response.data?.error;
        if (errorType === "usernameError") {
          setUsernameError(true);
        } else if (errorType === "phonenumError") {
          setPhoneNumError(true);
        } else if (errorType === "emailError") {
          setEmailError(true);
        }
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error in request setup:", error.message);
      }
    }
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} action={<Link to="/login" />}>
        <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
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
          sx={{ mb: 4 }}
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
          sx={{ mb: 4 }}
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
          sx={{ mb: 4 }}
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
          sx={{ mb: 4 }}
        />
        <Button variant="outlined" color="secondary" type="submit">
          Register
        </Button>
      </form>
      <small>
        Already have an account? <Link to="/login">Login Here</Link>
      </small>
    </div>
  );
};

export default RegisterForm;
