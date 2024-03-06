import React, { useState } from "react";
import { Container, Typography, TextField, Button, Box } from "@mui/material";

import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const LoginSuperUserPage = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState();
  const [password, setPassword] = useState("");
  const [success, setSuccess] = React.useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [failure, setFailure] = React.useState(false);
  const [failureMessage, setFailureMessage] = useState("");

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const postData = {
        phoneNumber: phoneNumber,
        password: password,
      };
      const result = await axios.post("/api/v1/superUser/login", postData);
      localStorage.setItem("token", result.data.token);
      localStorage.setItem("userName", result.data.user.name);
      localStorage.setItem("phoneNumber", result.data.user.phone);
      localStorage.setItem("superUserAuthorized", true);
      navigate("/superuser/dashboard");
      setPassword("");
      setPhoneNumber();

      setSuccess(true);
      setSuccessMessage("Login Successfully");
    } catch (error) {
      setFailure(true);
      setFailure("Login Failed");
      console.log(error);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSuccess(false);
    setFailure(false);
  };

  return (
    <>
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
      {/* Toast  */}
      <Box>
        {/* success Toast */}
        <Box>
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            open={success}
            autoHideDuration={6000}
            onClose={handleClose}
          >
            <Alert
              onClose={handleClose}
              severity="success"
              variant="filled"
              sx={{ width: "100%" }}
            >
              {successMessage}
            </Alert>
          </Snackbar>
        </Box>
        {/* failure Toast */}
        <Box>
          <Snackbar
            open={failure}
            autoHideDuration={6000}
            onClose={handleClose}
          >
            <Alert
              onClose={handleClose}
              severity="error"
              variant="filled"
              sx={{ width: "100%" }}
            >
              {failureMessage}
            </Alert>
          </Snackbar>
        </Box>
      </Box>
    </>
  );
};

export default LoginSuperUserPage;
