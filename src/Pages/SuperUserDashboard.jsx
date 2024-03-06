import React, { useEffect, useState } from "react";
import AuctioneerNavbar from "../Components/AuctioneerNavbar";
import ParticipantFooter from "../Components/ParticipantFooter";
import axios from "axios";

import {
  Box,
  Button,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import SuperUserNavbar from "../Components/SuperUserNavbar";

import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const SuperUserDashboard = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [auctioneerName, setAuctioneerName] = useState("");
  const [coAuctioneerPhoneNo, setCoAuctioneerPhoneNo] = useState("");
  const [auctioneerPhone, setAuctioneerPhone] = useState("");
  const [roomNo, setRoomNo] = useState("");
  const [currentPlayerCount, setCurrentPlayerCount] = useState(0);
  const [isRoomCreated, setIsRoomCreated] = useState(false);

  const [listOfRooms, setListOfRooms] = useState([]);

  const [success, setSuccess] = React.useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [failure, setFailure] = React.useState(false);
  const [failureMessage, setFailureMessage] = useState("");

  //function to create room
  const handleCreateRoom = async () => {
    try {
      const postData = {
        auctioneerName: auctioneerName,
        auctioneerPhone: auctioneerPhone,
        coAuctioneerPhone: coAuctioneerPhoneNo,
        roomNo: roomNo,
        currentPlayerCount: 1,
      };

      const result = await axios.post(
        "/api/v1/auctioneers/createAuctioneer",
        postData
      );
      console.log(result);
      if (result) {
        setIsRoomCreated(true);
      }

      setUsername(result.data.data.username);
      setPassword(result.data.data.password);
      getAllRoomInfo();
      setSuccess(true);
      setSuccessMessage("Room Created Successfully");
    } catch (error) {
      setFailure(true);
      setFailureMessage("Room not created successfully");
    }
  };

  const getAllRoomInfo = async () => {
    const result = await axios.get("/api/v1/auctioneers/getAllAuctioneer");
    console.log(result.data.result);
    setListOfRooms(result.data.result);
  };

  useEffect(() => {
    getAllRoomInfo();
  }, []);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSuccess(false);
    setFailure(false);
  };

  return (
    <>
      <SuperUserNavbar />
      <Box>
        {/* Create Team Section */}
        <section className="my-32">
          <Box
            sx={{
              height: "100%",
              width: "90%", // Adjusted width to 90%
              // border: "1px solid white",
              margin: "auto", // Centered along x-axis
              display: "flex-col",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "10px",
              padding: "30px",
              backgroundColor: "#070F2B",
            }}
          >
            {/* section title  */}
            <Box
              sx={{
                height: "100px",
                width: "90%", // Adjusted width to 90%
                // border: "1px solid white",
                margin: "auto", // Centered along x-axis
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "10px",
                marginBottom: "20px",
              }}
            >
              <Typography
                variant="h3"
                sx={{ fontFamily: "Protest Revolution", color: "white" }}
              >
                Create Room
              </Typography>
            </Box>

            {/* input section  */}
            <Box
              sx={{
                height: "100%",
                width: "90%",
                border: "1px solid white",
                margin: "auto",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "10px",
                backgroundColor: "#11161B",
                padding: "20px",
              }}
            >
              <Grid container spacing={5} alignItems={"center"}>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Auctioneer's name"
                    value={auctioneerName}
                    onChange={(e) => setAuctioneerName(e.target.value)}
                    variant="outlined"
                    sx={{
                      mb: 2,
                      backgroundColor: "white",
                      borderRadius: "5px",
                      width: "100%",
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Auctioneer's Phone Number"
                    value={auctioneerPhone}
                    onChange={(e) => setAuctioneerPhone(e.target.value)}
                    variant="outlined"
                    sx={{
                      mb: 2,
                      backgroundColor: "white",
                      borderRadius: "5px",
                      width: "100%",
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Co-Auctioneer's Phone Number"
                    value={coAuctioneerPhoneNo}
                    onChange={(e) => setCoAuctioneerPhoneNo(e.target.value)}
                    variant="outlined"
                    sx={{
                      mb: 2,
                      backgroundColor: "white",
                      borderRadius: "5px",
                      width: "100%",
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Room Number"
                    value={roomNo}
                    onChange={(e) => setRoomNo(e.target.value)}
                    variant="outlined"
                    sx={{
                      mb: 2,
                      backgroundColor: "white",
                      borderRadius: "5px",
                      width: "100%",
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  {isRoomCreated && (
                    <Box
                      sx={{
                        border: "white 1px solid",
                        borderColor: "white",
                        height: "150px",
                        width: "100%px",
                        justifyContent: "center",
                        alignItems: "center",
                        display: "flex-col",
                      }}
                    >
                      <Typography
                        variant="body1"
                        sx={{
                          fontFamily: "Protest Riot",
                          color: "white",
                          fontSize: "28px",
                        }}
                      >
                        UserName:
                        <span
                          style={{
                            fontFamily: "Protest Strike",
                            color: "yellow",
                            fontSize: "28px",
                          }}
                        >
                          {username}
                        </span>
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          fontFamily: "Protest Riot",
                          color: "white",
                          fontSize: "28px",
                        }}
                      >
                        Password:
                        <span
                          style={{
                            fontFamily: "Protest Strike",
                            color: "yellow",
                            fontSize: "28px",
                          }}
                        >
                          {password}
                        </span>
                      </Typography>
                    </Box>
                  )}
                </Grid>

                <Grid
                  item
                  xs={12}
                  md={6}
                  sx={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <Button
                    variant="contained"
                    size="large" // Increase the button size
                    onClick={handleCreateRoom}
                  >
                    Generate
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </section>

        {/* List of Owned Players  */}
        <section className="my-20">
          <Box
            sx={{
              height: "100%",
              width: "98%", // Adjusted width to 90%
              //   border: "1px solid white",
              margin: "auto", // Centered along x-axis
              display: "flex-col",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "10px",
              padding: "20px",
            }}
          >
            {/* section title  */}
            <Box
              sx={{
                height: "100px",
                width: "90%", // Adjusted width to 90%
                // border: "1px solid white",
                margin: "auto", // Centered along x-axis
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "10px",
                marginBottom: "20px",
              }}
            >
              <Typography
                variant="h3"
                sx={{ fontFamily: "Protest Revolution", color: "white" }}
              >
                Room stats
              </Typography>
            </Box>
            <Box
              sx={{
                height: "100%",
                width: "100%",
                margin: "auto",
                borderRadius: "10px",
                marginTop: "40px",
                padding: "20px",
                color: "white",
                backgroundColor: "#232329",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center", // Center contents horizontally
              }}
            >
              <Grid container spacing={3} alignItems={"center"}>
                {/* Table Header */}
                <Grid item md={1}>
                  <Typography
                    align="center"
                    sx={{
                      fontFamily: "Protest Riot",
                      color: "yellow",
                      fontSize: "20px",
                    }}
                  >
                    SlNo.
                  </Typography>
                </Grid>
                <Grid item md={2}>
                  <Typography
                    align="center"
                    sx={{
                      fontFamily: "Protest Riot",
                      color: "yellow",
                      fontSize: "20px",
                    }}
                  >
                    Auctioneer Name
                  </Typography>
                </Grid>

                <Grid item md={2}>
                  <Typography
                    align="center"
                    sx={{
                      fontFamily: "Protest Riot",
                      color: "yellow",
                      fontSize: "20px",
                    }}
                  >
                    Auctioneer's Phone Number
                  </Typography>
                </Grid>
                <Grid item md={1}>
                  <Typography
                    align="center"
                    sx={{
                      fontFamily: "Protest Riot",
                      color: "yellow",
                      fontSize: "20px",
                    }}
                  >
                    Room Number
                  </Typography>
                </Grid>
                <Grid item md={1}>
                  <Typography
                    align="center"
                    sx={{
                      fontFamily: "Protest Riot",
                      color: "yellow",
                      fontSize: "20px",
                    }}
                  >
                    Current PLayer Count
                  </Typography>
                </Grid>
                <Grid item md={2}>
                  <Typography
                    align="center"
                    sx={{
                      fontFamily: "Protest Riot",
                      color: "yellow",
                      fontSize: "20px",
                    }}
                  >
                    UserName
                  </Typography>
                </Grid>
                <Grid item md={2}>
                  <Typography
                    align="center"
                    sx={{
                      fontFamily: "Protest Riot",
                      color: "yellow",
                      fontSize: "20px",
                    }}
                  >
                    Password
                  </Typography>
                </Grid>
                <Grid item md={1}>
                  <Typography
                    align="center"
                    sx={{
                      fontFamily: "Protest Riot",
                      color: "yellow",
                      fontSize: "20px",
                    }}
                  >
                    More Info
                  </Typography>
                </Grid>

                {/* Table Body - Map the array */}
                {listOfRooms.length === 0 ? (
                  <Grid item xs={12}>
                    <Typography
                      align="center"
                      sx={{ fontFamily: "Protest Strike", fontSize: "18px" }}
                    >
                      No Auctioneers created
                    </Typography>
                  </Grid>
                ) : (
                  listOfRooms.map((item, index) => (
                    <React.Fragment key={index}>
                      <Grid item md={1}>
                        <Typography
                          align="center"
                          sx={{
                            fontFamily: "Protest Strike",
                            fontSize: "18px",
                          }}
                        >
                          {index + 1}
                        </Typography>
                      </Grid>
                      {/* <Grid item md={2}>
                      <img src={item.teamlogo} alt={item.Name} />
                    </Grid> */}
                      <Grid item md={2}>
                        <Typography
                          align="center"
                          sx={{
                            fontFamily: "Protest Strike",
                            fontSize: "18px",
                          }}
                        >
                          {item.auctioneerName}
                        </Typography>
                      </Grid>
                      <Grid item md={2}>
                        <Typography
                          align="center"
                          sx={{
                            fontFamily: "Protest Strike",
                            fontSize: "18px",
                          }}
                        >
                          {item.auctioneerPhone}
                        </Typography>
                      </Grid>
                      <Grid item md={1}>
                        <Typography
                          align="center"
                          sx={{
                            fontFamily: "Protest Strike",
                            fontSize: "18px",
                          }}
                        >
                          {item.roomNo}
                        </Typography>
                      </Grid>
                      <Grid item md={1}>
                        <Typography
                          align="center"
                          sx={{
                            fontFamily: "Protest Strike",
                            fontSize: "18px",
                          }}
                        >
                          {item.currentPlayerCount}
                        </Typography>
                      </Grid>
                      <Grid item md={2}>
                        <Typography
                          align="center"
                          sx={{
                            fontFamily: "Protest Strike",
                            fontSize: "18px",
                          }}
                        >
                          {item.username}
                        </Typography>
                      </Grid>
                      <Grid item md={2}>
                        <Typography
                          align="center"
                          sx={{
                            fontFamily: "Protest Strike",
                            fontSize: "18px",
                          }}
                        >
                          {item.password}
                        </Typography>
                      </Grid>

                      <Grid item md={1}>
                        <Typography
                          align="center"
                          sx={{
                            fontFamily: "Protest Strike",
                            fontSize: "18px",
                          }}
                        >
                          <Button>
                            <InfoIcon />
                          </Button>
                        </Typography>
                      </Grid>
                    </React.Fragment>
                  ))
                )}
              </Grid>
            </Box>
          </Box>
        </section>
        <ParticipantFooter />
      </Box>
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

export default SuperUserDashboard;
