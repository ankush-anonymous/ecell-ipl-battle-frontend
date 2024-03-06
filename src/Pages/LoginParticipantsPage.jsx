import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  InputAdornment,
} from "@mui/material";
import { AccountCircle, LockRounded } from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { purple } from "@mui/material/colors";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

// Create a theme instance.
const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: purple[500],
    },
  },
  components: {
    MuiTextField: {
      defaultProps: {
        InputProps: {
          style: {
            color: "#fff",
          },
        },
        InputLabelProps: {
          style: {
            color: "#adadad",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          margin: "20px 0px",
          backgroundColor: "#403E6A",
          "&:hover": {
            backgroundColor: "#322F53",
          },
        },
      },
    },
  },
});

const LoginParticipantsPage = () => {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [logoUrl, setLogoUrl] = useState("/ecell_logo.png");
  const [success, setSuccess] = React.useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [failure, setFailure] = React.useState(false);
  const [failureMessage, setFailureMessage] = useState("");

  const handleUserIdChange = (e) => {
    setUserName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const postData = {
        username: userName,
        password: password,
      };
      const result = await axios.post(
        "/api/v1/participants/loginParticipant",
        postData
      );
      console.log(result);
      localStorage.setItem("token", result.data.token);
      localStorage.setItem("userName", result.data.user.userName);
      localStorage.setItem("auctioneerId", result.data.user.auctioneerID);
      localStorage.setItem("_id", result.data.user._id);
      localStorage.setItem("balanceAmount", result.data.user.balanceAmount);
      localStorage.setItem("iplTeamName", result.data.user.iplTeamName);
      localStorage.setItem("teamname", result.data.user.teamname);
      localStorage.setItem("iplTeamLogo", result.data.user.iplTeamLogo);

      setPassword("");
      setUserName("");

      navigate("/participant/dashboard");
      setSuccess(true);
      setSuccessMessage("Login Successfully");
    } catch (error) {
      setFailure(true);
      setFailure("Login Failed");
      console.log(error);
    }
  };

  // Function to change the logo dynamically
  const changeLogo = () => {
    // Example of changing the logo dynamically
    const newLogoUrl = "https://example.com/newlogo.png";
    setLogoUrl(newLogoUrl);
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
      <ThemeProvider theme={theme}>
        <div
          style={{
            minHeight: "100vh",
            background: "linear-gradient(45deg, #333, #5a5a5a)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Container component="main" maxWidth="xs">
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "20px",
                borderRadius: "5px",
                backgroundColor: "#232329",
                boxShadow: "0 0 20px rgba(0, 0, 0, 0.7)",
              }}
            >
              <Typography
                component="h1"
                variant="h5"
                style={{ color: "#fff", marginBottom: "20px" }}
              >
                Sign in
              </Typography>
              <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                {/* Displaying the logo */}
                <div
                  style={{
                    textAlign: "center",
                    margin: "20px 0",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={logoUrl}
                    alt="Logo"
                    style={{ maxWidth: "100px", maxHeight: "100px" }}
                  />
                </div>
                {/* User ID and Password fields */}
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="userId"
                  label="User ID"
                  name="userId"
                  autoComplete="username"
                  autoFocus
                  value={userName}
                  onChange={handleUserIdChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle style={{ color: "#adadad" }} />
                      </InputAdornment>
                    ),
                  }}
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
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockRounded style={{ color: "#adadad" }} />
                      </InputAdornment>
                    ),
                  }}
                />
                {/* Sign In Button */}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={changeLogo}
                >
                  Sign In
                </Button>
              </form>
            </Box>
          </Container>
        </div>
      </ThemeProvider>
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

export default LoginParticipantsPage;
