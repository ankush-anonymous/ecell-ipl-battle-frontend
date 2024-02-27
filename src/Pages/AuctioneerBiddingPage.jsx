import {
  Box,
  Button,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import ParticipantNavbar from "../Components/ParticipantNavbar";

const currentPlayer = {
  image:
    "https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/IPLHeadshot2023/57.png",
  firstname: "Mahendra Singh ",
  surname: "Dhoni ",
  country: "India",
  DOB: "1981-07-07",
  Age: 35,
  Specialism: "cover drive",
  BattingStyle: "RHB",
  BowlingStyle: "right arm medium",
  testcaps: 269,
  odicaps: 175,
  t20caps: 31,
  iplrating: 1,
  overseasflag: "false",
  soldby: "rcb",
  bidwonby: "rcb",
};

const AuctioneerBiddingPage = () => {
  const [teamLeader, setTeamLeader] = useState("");
  const [teamAssigned, setTeamAssigned] = useState("");

  const handleCreateTeam = () => {
    // Your logic to create the team
    console.log("Team Leader:", teamLeader);
    console.log("Team Assigned:", teamAssigned);
  };
  return (
    <>
      <Box sx={{ maxWidth: "1280px", margin: "auto" }}>
        <ParticipantNavbar />

        {/* Bidding section  */}
        <section className="my-32">
          <Box
            sx={{
              height: "100%",
              width: "90%", // Adjusted width to 90%
              //   border: "1px solid white",
              margin: "auto", // Centered along x-axis
              display: "flex-col",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "10px",
              padding: "20px",
              backgroundColor: "#232329",
              overflow: "hidden",
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
                Player Currently At Bid
              </Typography>
            </Box>

            {/* Input section  */}
            <Box>
              <Grid container spacing={1}>
                {/* Image Box  */}
                <Grid item xs={12} md={4}>
                  {/* Image  */}
                  <Box
                    sx={{
                      height: "100%",
                      width: "90%", // Adjusted width to 90%
                      //   border: "1px solid white",
                      margin: "auto", // Centered along x-axis
                      display: "flex-col",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "10px",
                    }}
                  >
                    <Box
                      sx={{
                        height: "300px",
                        width: "90%", // Adjusted width to 90%
                        // border: "1px solid white",
                        margin: "auto", // Centered along x-axis
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: "10px",
                      }}
                    >
                      <img src={currentPlayer.image} />
                    </Box>
                    <Box
                      sx={{
                        height: "100px",
                        width: "90%", // Adjusted width to 90%
                        // border: "1px solid white",
                        margin: "auto", // Centered along x-axis
                        display: "flex-col",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: "10px",
                        overflow: "hidden",
                      }}
                    >
                      <Typography
                        variant="h4"
                        sx={{
                          fontFamily: "Protest Riot",
                          color: "white",
                          textAlign: "center",
                        }}
                      >
                        {currentPlayer.firstname}
                        {currentPlayer.surname}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                {/* Portfolio Box  */}
                <Grid item xs={12} md={8}>
                  <Box
                    sx={{
                      height: "100%",
                      width: "90%", // Adjusted width to 90%
                      //   border: "1px solid white",
                      margin: "auto", // Centered along x-axis
                      marginLeft: "30px",
                      display: "flex-col",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "10px",
                      padding: "20px",
                    }}
                  >
                    {/* Tag Box  */}
                    <Box
                      sx={{
                        // border: "1px solid white",
                        height: "100px",
                        width: "90%",
                        margin: "auto",
                        borderRadius: "10px",
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "flex-end",
                        alignItems: "center", // Align items vertically
                        alignContent: "stretch",
                        padding: "10px",
                        gap: "20px",
                      }}
                    >
                      <Box
                        sx={{
                          //   border: "1px solid white",
                          height: "50px",
                          width: "50px",
                        }}
                      >
                        <img
                          src="https://www.freepnglogos.com/uploads/star-png/star-alt-icon-small-flat-iconset-paomedia-13.png"
                          alt="Star Icon"
                        />
                      </Box>
                      <Box
                        sx={{
                          //   border: "1px solid white",
                          height: "50px",
                          width: "50px",
                        }}
                      >
                        <img
                          src="https://images.vexels.com/media/users/3/242810/isolated/preview/faf4f5ad02d6d68cfeafa44e1b57649a-plane-semi-flat.png"
                          alt="Plane Icon"
                        />
                      </Box>
                      <Box
                        sx={{
                          //   border: "1px solid white",
                          height: "50px",
                          width: "50px",
                          display: "flex",
                          alignItems: "center", // Center items along the y-axis
                          justifyContent: "center", // Center items along the x-axis
                        }}
                      >
                        <img
                          src="https://upload.wikimedia.org/wikipedia/commons/c/c4/Indian_flag.png"
                          alt="Indian flag Icon"
                        />
                      </Box>
                      <Box
                        sx={{
                          border: "1px solid red",
                          borderRadius: "50%",
                          height: "80px",
                          width: "80px",
                        }}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            color: "red",
                            textAlign: "center",
                            fontSize: "50px",
                            fontFamily: "Protest Revolution",
                          }}
                        >
                          {currentPlayer.iplrating}
                        </Typography>
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        height: "100%",
                        width: "90%",
                        // border: "0.5px solid white",
                        margin: "auto",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        // marginTop: "20px",
                        borderRadius: "10px",
                        padding: "20px",
                      }}
                    >
                      <Grid container spacing={5}>
                        <Grid item xs={12} md={6}>
                          <Box sx={{ marginBottom: "20px" }}>
                            <Typography
                              variant="body"
                              sx={{
                                fontFamily: "Protest Guerrilla",
                                color: "yellow",
                                fontSize: "24px",
                              }}
                            >
                              Country :
                            </Typography>
                            <Typography
                              variant="body"
                              sx={{
                                fontFamily: "Protest Strike",
                                color: "white",
                                fontSize: "28px",
                              }}
                            >
                              {" "}
                              {currentPlayer.country}
                            </Typography>
                          </Box>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Box
                              variant={"span"}
                              sx={{ height: "50px", width: "50px" }}
                            >
                              <img
                                src="https://res.cloudinary.com/dsx8eh1hj/image/upload/v1708635625/batt-removebg-preview_v2woyj.png"
                                alt=""
                              />
                            </Box>
                            <Typography
                              variant="body"
                              sx={{
                                fontFamily: "Protest Strike",
                                color: "orange",
                                fontSize: "28px",
                              }}
                            >
                              : {currentPlayer.BattingStyle}
                            </Typography>
                          </Box>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Box
                              variant={"span"}
                              sx={{ height: "50px", width: "50px" }}
                            >
                              <img
                                src="https://res.cloudinary.com/dsx8eh1hj/image/upload/v1708636258/ball_wzyum5.png"
                                alt=""
                              />
                            </Box>
                            <Typography
                              variant="body"
                              sx={{
                                fontFamily: "Protest Strike",
                                color: "orange",
                                fontSize: "28px",
                              }}
                            >
                              : {currentPlayer.BowlingStyle}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Box>
                            <Typography
                              variant="body"
                              sx={{
                                fontFamily: "Protest Guerrilla",
                                color: "yellow",
                                fontSize: "25px",
                              }}
                            >
                              Age :
                            </Typography>
                            <Typography
                              variant="body"
                              sx={{
                                fontFamily: "Protest Strike",
                                color: "white",
                                fontSize: "28px",
                              }}
                            >
                              {" "}
                              {currentPlayer.Age}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography
                              variant="body"
                              sx={{
                                fontFamily: "Protest Guerrilla",
                                color: "#836FFF",
                                fontSize: "24px",
                              }}
                            >
                              Test :
                            </Typography>
                            <Typography
                              variant="body"
                              sx={{
                                fontFamily: "Protest Strike",
                                color: "white",
                                fontSize: "28px",
                              }}
                            >
                              {" "}
                              {currentPlayer.testcaps}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography
                              variant="body"
                              sx={{
                                fontFamily: "Protest Guerrilla",
                                color: "#836FFF",
                                fontSize: "24px",
                              }}
                            >
                              ODI :
                            </Typography>
                            <Typography
                              variant="body"
                              sx={{
                                fontFamily: "Protest Strike",
                                color: "white",
                                fontSize: "28px",
                              }}
                            >
                              {" "}
                              {currentPlayer.odicaps}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography
                              variant="body"
                              sx={{
                                fontFamily: "Protest Guerrilla",
                                color: "#836FFF",
                                fontSize: "24px",
                              }}
                            >
                              T20 :
                            </Typography>
                            <Typography
                              variant="body"
                              sx={{
                                fontFamily: "Protest Strike",
                                color: "white",
                                fontSize: "28px",
                              }}
                            >
                              {" "}
                              {currentPlayer.t20caps}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography
                              variant="h6"
                              sx={{
                                fontFamily: "Protest Guerrilla",
                                color: "#836FFF",
                                fontSize: "24px",
                              }}
                            >
                              Specialism :
                            </Typography>
                            <Typography
                              variant="body"
                              sx={{
                                fontFamily: "Protest Strike",
                                color: "#FC6736",
                                fontSize: "28px",
                                paddingLeft: "20px",
                              }}
                            >
                              {" "}
                              {currentPlayer.Specialism.toUpperCase()}
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
              <Box sx={{ marginTop: "30px" }}>
                <Grid container spacing={5}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Final Bid Amount"
                      value={teamLeader}
                      onChange={(e) => setTeamLeader(e.target.value)}
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
                    <Select
                      value={teamAssigned}
                      onChange={(e) => setTeamAssigned(e.target.value)}
                      displayEmpty
                      variant="outlined"
                      sx={{
                        mb: 2,
                        width: "100%",
                        backgroundColor: "white",
                        borderRadius: "5px",
                      }}
                      inputProps={{ style: { borderRadius: "5px" } }}
                    >
                      <MenuItem value="" disabled>
                        Select Team Assigned
                      </MenuItem>
                      <MenuItem value="Team A">Team A</MenuItem>
                      <MenuItem value="Team B">Team B</MenuItem>
                      <MenuItem value="Team C">Team C</MenuItem>
                    </Select>
                    <Box>
                      <Button
                        variant="contained"
                        size="large" // Increase the button size
                        onClick={handleCreateTeam}
                      >
                        Create Team
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Box>
        </section>
      </Box>
    </>
  );
};

export default AuctioneerBiddingPage;
