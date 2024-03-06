import React, { useEffect, useState, useRef, SyntheticEvent } from "react";

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
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const AuctioneerBiddingPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [bidAmount, setBidAmount] = useState();
  const [teamLeader, setTeamLeader] = useState("");
  const [teamAssigned, setTeamAssigned] = useState("");
  const [assignedTeamLogo, setAssignedTeamLogo] = useState("");
  const [assignedTeamId, setAssignedTeamId] = useState("");
  const [playerCount, setPlayerCount] = useState();
  const [teams, setTeams] = useState([]);
  const [listOfTeams, setListOfTeams] = useState([]);
  const [isBidded, setIsBidded] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState({});
  const [currentPlayerId, setCurrentPlayerId] = useState();
  const [isOverSeas, setIsOverSeas] = useState(false);

  const [success, setSuccess] = React.useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [failure, setFailure] = React.useState(false);
  const [failureMessage, setFailureMessage] = useState("");
  const flag = localStorage.getItem("overSeasFlag");

  const roomId = localStorage.getItem("_id");

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
      `/api/v1/auctioneers/updateAuctioneerById/${roomId}`,
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
      `/api/v1/auctioneers/updateAuctioneerById/${roomId}`,
      postData
    );
    console.log(updatePlayer);

    // Update playerCount state after successful patch request
    setPlayerCount(playerCount + 1);
    window.location.reload(true);
  };

  const fetchCurrentPlayer = async () => {
    const roomId = localStorage.getItem("_id");
    const room = await axios.get(
      `/api/v1/auctioneers/getAuctioneerById/${roomId}`
    );
    console.log(room.data);
    const playerCount = room.data.data.currentPlayerCount;
    setPlayerCount(playerCount);
    const currentPlayer = await axios.get(
      `/api/v1/players/getAllPlayers?playerNo=${playerCount}`
    );

    // console.log("current:", currentPlayer.data.players[0].Specialism);
    localStorage.setItem("iplRating", currentPlayer.data.players[0].iplRating);
    localStorage.setItem(
      "overSeasFlag",
      currentPlayer.data.players[0].overSeasFlag
    );
    setIsOverSeas(flag);
    setCurrentPlayer(currentPlayer.data.players[0]);
    setCurrentPlayerId(currentPlayer.data.players[0]._id);
    checkBiddedPlayer(currentPlayer.data.players[0]._id);
  };

  const handleBid = async () => {
    try {
      const postData = {
        auctioneerID: roomId,
        participantID: assignedTeamId,
        biddingAmount: bidAmount,
        iplPlayerID: currentPlayerId,
      };

      const bid = await axios.post(
        "/api/v1/bid/createBiddingTransit",
        postData
      );

      console.log("bidded:", bid);

      const participant = await axios.get(
        `/api/v1/participants/getParticipantsById/${assignedTeamId}`
      );
      console.log(participant);
      const balanceAmount = participant.data.data.balanceAmount;
      const AllRounderCount = participant.data.data.AllRounderCount;
      const BatsmanCount = participant.data.data.BatsmanCount;
      const BowlerCount = participant.data.data.BowlerCount;
      const NonOverSeasCount = participant.data.data.NonOverSeasCount;
      const OverSeasCount = participant.data.data.OverSeasCount;
      const PlayerCount = participant.data.data.PlayerCount;
      const WicketKeeperCount = participant.data.data.WicketKeeperCount;
      const StarCount = participant.data.data.StarCount;
      const score = participant.data.data.score;

      console.log(currentPlayer.Specialism);
      const updatePlayerStats = {};

      if (currentPlayer.Specialism === "BATSMAN") {
        updatePlayerStats.BatsmanCount = BatsmanCount + 1;
      }
      if (currentPlayer.Specialism === "BOWLER") {
        updatePlayerStats.BowlerCount = BowlerCount + 1;
      }
      if (currentPlayer.Specialism === "ALL-ROUNDER") {
        updatePlayerStats.AllRounderCount = AllRounderCount + 1;
      }

      if (currentPlayer.Specialism === "WICKETKEEPER") {
        updatePlayerStats.WicketKeeperCount = WicketKeeperCount + 1;
      }
      if (currentPlayer.overSeasFlag === false) {
        updatePlayerStats.NonOverSeasCount = NonOverSeasCount + 1;
      }
      if (currentPlayer.overSeasFlag === true) {
        updatePlayerStats.OverSeasCount = OverSeasCount + 1;
      }
      if (currentPlayer.isStarPlayer === true) {
        updatePlayerStats.StarCount = StarCount + 1;
        const points = localStorage.getItem("iplRating");

        updatePlayerStats.score = score + parseInt(points) + 5;
      } else {
        const points = localStorage.getItem("iplRating");

        updatePlayerStats.score = score + parseInt(points);
      }

      updatePlayerStats.PlayerCount = PlayerCount + 1;
      updatePlayerStats.balanceAmount = balanceAmount - parseInt(bidAmount);

      const updateParticipant = await axios.patch(
        `/api/v1/participants/updateParticipantsById/${assignedTeamId}`,
        updatePlayerStats
      );
      console.log("updated:", updateParticipant);

      if (!updateParticipant) {
        console.log("participant not updated");
        setFailure(true);
        setFailureMessage("Bid not successful");
        setTeamAssigned("");
        setBidAmount();
        return;
      }
      setSuccess(true);
      setSuccessMessage("Bid Successful");
      setIsBidded(true);
    } catch (error) {
      console.log(error);
      setFailure(true);
      setFailureMessage("Bid not successful");
    }
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

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSuccess(false);
    setFailure(false);
  };

  useEffect(() => {
    fetchCurrentPlayer();
    fetchTeamsOfRoom();
    const roomId = localStorage.getItem("_id");
  }, [playerCount, flag]);

  return (
    <>
      <AuctioneerNavbar />
      <Box sx={{ maxWidth: "1280px", margin: "auto" }}>
        {/* Player Currently at the bid - HEADING  */}
        <section className="mt-16">
          <Box
            sx={{
              height: "80px",
              width: "90%", // Adjusted width to 90%
              margin: "auto", // Centered along x-axis
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "10px",
              // border: "1px solid white",
              // marginBottom: "20px",
            }}
          >
            <Typography
              variant="h3"
              sx={{ fontFamily: "Protest Revolution", color: "white" }}
            >
              Player Currently At Bid
            </Typography>
          </Box>
        </section>

        {/* Bidding section  */}
        <section className="mb-32">
          <Box
            sx={{
              height: "100%",
              width: "100%", // Adjusted width to 90%
              //   border: "1px solid white",
              margin: "auto", // Centered along x-axis
              display: "flex-col",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "10px",
              // padding: "20px",
              // backgroundColor: "#232329",
              backgroundImage: `url('/background.jpeg')`,
              overflow: "hidden",
            }}
          >
            {/* Input section  */}
            <Box>
              <Grid
                container
                // spacing={1}
                sx={{
                  // border: "2px solid white",
                  height: "600px",
                  padding: "40px",
                }}
              >
                {/* Image Box  */}
                <Grid item xs={12} md={6}>
                  {/* Image  */}
                  <Box
                    sx={{
                      height: "550px",
                      width: "100%", // Adjusted width to 90%
                      // borderLeft: "10px solid white",
                      // borderBottom: "10px Solid white",Search yes it is
                      // border: "2px solid #F29F05",
                      margin: "auto", // Centered along x-axis
                      display: "flex-col",
                      justifyContent: "center",
                      alignItems: "center",
                      // borderRadius: "10px",
                    }}
                  >
                    {/* <Box className="w-72 h-72  border-r-8 border-t-8 ml-72 absolute"></Box> */}

                    {/* Image  */}
                    <Box
                      sx={{
                        height: "90%",
                        width: "90%", // Adjusted width to 90%
                        // border: "5px solid #F29F05",
                        boxShadow: "inset 0 0 0 3px #F29F05",
                        margin: "auto", // Centered along x-axis
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: "10px",
                        overflow: "hidden",
                        backdropFilter: "blur(4px)", // Adjust the blur value as needed
                        padding : "4",
                      }}
                    >
                      <img src={currentPlayer.image} />
                    </Box>

                    {/* Intro of player  */}
                    <Box
                      sx={{
                        height: "85px",
                        width: "100%", // Adjusted width to 90%
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
                        {currentPlayer.firstname} {currentPlayer.surname}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                {/* Portfolio Box  */}
                <Grid item xs={12} md={6}>
                  <Box
                    sx={{
                      height: "100%",
                      width: "90%", // Adjusted width to 90%
                      //  border: "1px solid white",
                      margin: "auto", // Centered along x-axis
                      // marginLeft: "30px",
                      display: "flex-col",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "10px",
                      // padding: "20px",
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
                        gap: "10px",
                      }}
                    >
                      {/* Player Rating  */}
                      <Box className="w-full flex items-center justify-center">
                        <Box
                          sx={{
                            border: "2px solid red",
                            borderRadius: "50%",
                            height: "100px",
                            width: "100px",
                          }}
                        >
                          <Typography
                            variant="h6"
                            sx={{
                              color: "red",
                              // color: "yellow",
                              textAlign: "center",
                              fontSize: "60px",
                              fontFamily: "Protest Revolution",
                            }}
                          >
                            {currentPlayer.iplRating}
                          </Typography>
                        </Box>
                      </Box>

                      {/* Other Icons  */}
                      <Box className="w-full flex items-center justify-evenly">
                        {console.log(flag)}
                        {console.log(isOverSeas)}

                        {flag && (
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
                        )}

                        <Box
                          sx={{
                            //   border: "1px solid white",
                            height: "60px",
                            width: "60px",
                          }}
                        >
                          <img
                            src="https://www.freepnglogos.com/uploads/star-png/star-alt-icon-small-flat-iconset-paomedia-13.png"
                            alt="Star Icon"
                          />
                        </Box>
                      </Box>
                    </Box>

                    {/* Stats  */}
                    <Box
                      sx={{
                        height: "80%",
                        width: "90%",
                        // border: "0.5px solid white",
                        margin: "auto",
                        marginTop: "20px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: "10px",
                        padding: "20px",
                      }}
                    >
                      <Grid container spacing={1}>
                        <Grid item xs={12} md={6}>
                          <Box
                            sx={{ marginBottom: "0px", textAlign: "center" }}
                          >
                            <Typography
                              variant="body"
                              sx={{
                                fontFamily: "Protest Guerrilla",
                                color: "yellow",
                                fontSize: "24px",
                                textAlign: "center",
                                // display: "inline",
                              }}
                            >
                              Country
                            </Typography>
                            <br />
                            <Typography
                              variant="body"
                              sx={{
                                fontFamily: "Protest Strike",
                                color: "white",
                                fontSize: "28px",
                                margin: 0, // Remove margin
                                padding: 0, // Remove padding
                              }}
                            >
                              {" "}
                              {currentPlayer.country}
                            </Typography>
                          </Box>
                        </Grid>

                        {/* Country and Specialism  */}
                        <Grid item xs={12} md={6}>
                          <Box sx={{ textAlign: "center" }}>
                            <Typography
                              variant="h6"
                              sx={{
                                fontFamily: "Protest Guerrilla",
                                color: "yellow",
                                fontSize: "24px",
                              }}
                            >
                              Specialism
                            </Typography>
                            <Typography
                              variant="body"
                              sx={{
                                fontFamily: "Protest Strike",
                                // color: "#FC6736",
                                color: "white",
                                fontSize: "28px",
                                // paddingLeft: "20px",
                              }}
                            >
                              {" "}
                              {currentPlayer.Specialism}
                            </Typography>
                          </Box>
                        </Grid>

                        {/* Bowling and Batting Styles  */}
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "100%",
                            marginTop: "20px",
                            // border: "1px solid white",
                          }}
                        >
                          <Box
                            variant={"span"}
                            sx={{ height: "50px", width: "50px" }}
                          >
                            <img
                              src="https://res.cloudinary.com/dsx8eh1hj/image/upload/v1708635625/batt-removebg-preview_v2woyj.png"
                              alt="Batting Style"
                            />
                          </Box>
                          <br />
                          <Typography
                            variant="body"
                            sx={{
                              fontFamily: "Protest Strike",
                              color: "orange",
                              fontSize: "28px",
                              margin: 0, // Remove margin
                              padding: 0, // Remove padding
                            }}
                          >
                            : {currentPlayer.BattingStyle}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "100%",
                          }}
                        >
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
                            :{currentPlayer.BowlingStyle}
                          </Typography>
                        </Box>
                        <Box className="w-full mt-4 border-b-2"></Box>
                      </Grid>
                    </Box>
                  </Box>
                </Grid>
              </Grid>

              {/* Control  */}
              <Box
                sx={{
                  marginTop: "30px",
                  backgroundColor: "#232329",
                  width: "100%",
                  padding: "20px",
                }}
              >
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

export default AuctioneerBiddingPage;
