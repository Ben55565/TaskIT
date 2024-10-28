import React, { useState } from "react";
import { TextField, Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import "./Register.css";
import axios from "axios";

const RegisterForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setuserName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNum, setphoneNum] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
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
      console.log(response.data); // Logs the user details
    } catch (error) {
      console.error("There was an error creating the task!", error);
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
          type="email"
          variant="outlined"
          color="secondary"
          label="Email"
          helperText="Invalid email address. Requiered format: aaa@bbb.com"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          fullWidth
          required
          sx={{ mb: 4 }}
        />
        <TextField
          type="tel"
          variant="outlined"
          color="secondary"
          label="Phone number"
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
