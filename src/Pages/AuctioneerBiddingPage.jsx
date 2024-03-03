import React, { useEffect, useState } from "react";

import {
  Box,
  Button,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import ParticipantNavbar from "../Components/ParticipantNavbar";
import ParticipantFooter from "../Components/ParticipantFooter";
import AuctioneerNavbar from "../Components/AuctioneerNavbar";
import axios from "axios";
import { teams } from "../data/iplTeams";
const AuctioneerBiddingPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [bidAmount, setBidAmount] = useState();
  const [teamLeader, setTeamLeader] = useState("");
  const [teamAssigned, setTeamAssigned] = useState("");
  const [assignedTeamLogo, setAssignedTeamLogo] = useState("");
  const [assignedTeamId, setAssignedTeamId] = useState("");
  const [playerCount, setPlayerCount] = useState();
  const roomId = localStorage.getItem("_id");
  const [teams, setTeams] = useState([]);
  const [listOfTeams, setListOfTeams] = useState([]);
  const [isBidded, setIsBidded] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState({});
  const [currentPlayerId, setCurrentPlayerId] = useState();

  const fetchTeamsOfRoom = async () => {
    const result = await axios.get(
      `/api/v1/participants/getAllParticipants?auctioneerID=${roomId}`
    );
    setTeams(result.data.participants);
    console.log(result.data.participants);
  };

  const handlePrevious = async () => {
    setIsBidded(false);
    const postData = {
      currentPlayerCount: playerCount - 1,
    };
    const updatePlayer = await axios.patch(
      `api/v1/auctioneers/updateAuctioneerById/${roomId}`,
      postData
    );
    console.log(updatePlayer);

    // Update playerCount state after successful patch request
    setPlayerCount(playerCount - 1);
  };

  const handleNext = async () => {
    setIsBidded(false);
    const postData = {
      currentPlayerCount: playerCount + 1,
    };
    const updatePlayer = await axios.patch(
      `api/v1/auctioneers/updateAuctioneerById/${roomId}`,
      postData
    );
    console.log(updatePlayer);

    // Update playerCount state after successful patch request
    setPlayerCount(playerCount + 1);
  };

  const fetchCurrentPlayer = async () => {
    const roomId = localStorage.getItem("_id");
    const room = await axios.get(
      `/api/v1/auctioneers/getAuctioneerById/${roomId}`
    );
    const playerCount = room.data.data.currentPlayerCount;
    setPlayerCount(playerCount);
    const currentPlayer = await axios.get(
      `/api/v1/players/getAllPlayers?playerNo=${playerCount}`
    );

    // console.log("current:", currentPlayer.data.players[0]._id);
    setCurrentPlayer(currentPlayer.data.players[0]);
    setCurrentPlayerId(currentPlayer.data.players[0]._id);
    checkBiddedPlayer(currentPlayer.data.players[0]._id);
  };

  const handleBid = async () => {
    const postData = {
      auctioneerID: roomId,
      participantID: assignedTeamId,
      biddingAmount: bidAmount,
      iplPlayerID: currentPlayerId,
    };
    const result = await axios.post(
      "/api/v1/bid/createBiddingTransit",
      postData
    );

    setIsBidded(true);
    setTeamAssigned("");
    setBidAmount();
  };

  const checkBiddedPlayer = async (playerId) => {
    console.log("id:", playerId);
    const result = await axios.get(
      `/api/v1/bid/getAllBiddingTransit?auctioneerID=${roomId}&iplPlayerID=${playerId}`
    );

    if (result.data.count == 1) {
      setIsBidded(true);
    }
  };

  useEffect(() => {
    fetchCurrentPlayer();
    fetchTeamsOfRoom();
    const roomId = localStorage.getItem("_id");
  }, [playerCount]);

  return (
    <>
      <Box sx={{ maxWidth: "1280px", margin: "auto" }}>
        <AuctioneerNavbar />

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
                      <img src={currentPlayer.image} alt="Player" />
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
                          {currentPlayer.iplRating}
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
                              {currentPlayer.Specialism}
                              {/* {currentPlayer.Specialism.toUpperCase()} */}
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
                      value={bidAmount}
                      onChange={(e) => setBidAmount(e.target.value)}
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
                      onChange={(e) => {
                        const selectedTeam = teams.find(
                          (team) => team.teamname === e.target.value
                        );
                        setTeamAssigned(e.target.value);
                        setAssignedTeamLogo(
                          selectedTeam ? selectedTeam.iplTeamLogo : ""
                        );
                        setAssignedTeamId(selectedTeam ? selectedTeam._id : "");
                        console.log(selectedTeam); // Log the selected team here
                      }}
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
                      {teams.map((team, key) => (
                        <MenuItem key={key} value={team.teamname}>
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <img
                              src={team.iplTeamLogo}
                              alt={team.teamname}
                              style={{ width: 24, marginRight: 8 }}
                            />
                            {team.teamname}
                          </div>
                        </MenuItem>
                      ))}
                    </Select>
                    {/* {console.log(isBidded)} */}
                    <Box>
                      {!isBidded && (
                        <Button
                          variant="contained"
                          size="large" // Increase the button size
                          onClick={handleBid}
                          sx={{ backgroundColor: "#E8AA42" }}
                        >
                          Bid
                        </Button>
                      )}
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              <Box
                sx={{
                  marginTop: "20px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handlePrevious}
                >
                  Previous
                </Button>
                <Box sx={{ marginLeft: "700px" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    sx={{ marginLeft: "10px" }}
                  >
                    Next
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </section>
        <ParticipantFooter />
      </Box>
    </>
  );
};

export default AuctioneerBiddingPage;
