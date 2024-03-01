import React, { useState } from "react";
import { Container, Typography, TextField, Button, Box } from "@mui/material";

import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const LoginSuperUserPage = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState();
  const [password, setPassword] = useState("");

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = {
      phoneNumber: phoneNumber,
      password: password,
    };
    const result = await axios.post("/api/v1/superUser/login", postData);
    localStorage.setItem("token", result.data.token);
    localStorage.setItem("userName", result.data.user.name);
    localStorage.setItem("phoneNumber", result.data.user.phone);

    setPassword("");
    setPhoneNumber();

    navigate("/superuser/rooms");
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          border: "1px solid #ccc",
          padding: "20px",
          borderRadius: "5px",
          backgroundColor: "#f9f9f9",
          height: "400px", // Adjust the height here
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form
          onSubmit={handleSubmit}
          style={{ width: "100%", marginTop: "20px" }}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="phoneNumber"
            label="Phone Number"
            name="phoneNumber"
            autoComplete="tel"
            autoFocus
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={handlePasswordChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ marginTop: "20px" }}
          >
            Sign In
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default LoginSuperUserPage;
