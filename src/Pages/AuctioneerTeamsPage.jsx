import React, { useEffect, useState } from "react";
import AuctioneerNavbar from "../Components/AuctioneerNavbar";
import ParticipantFooter from "../Components/ParticipantFooter";
import axios from "axios";

import {
  Box,
  Button,
  CircularProgress,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { useNavigate, useParams } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import { teams } from "../data/iplTeams";

const AuctioneerTeamsPage = () => {
  const { auctioneerId } = useParams();
  localStorage.setItem("auctioneerId", auctioneerId);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isTeamCreated, setIsTeamCreated] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [teamAssigned, setTeamAssigned] = useState("");
  const [assignedTeamLogo, setAssignedTeamLogo] = useState("");
  const [listOfTeams, setListOfTeams] = useState([]);

  const [success, setSuccess] = React.useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [failure, setFailure] = React.useState(false);
  const [failureMessage, setFailureMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const handleCreateTeam = async () => {
    try {
      setLoading(true);
      const postData = {
        teamname: teamName,
        iplTeamName: teamAssigned,
        iplTeamLogo: assignedTeamLogo,
        auctioneerID: auctioneerId,
      };
      console.log(postData);
      const result = await axios.post(
        "/api/v1/participants/createParticipant",
        postData
      );
      if (result) {
        setIsTeamCreated(true);
        setSuccess(true);
        setSuccessMessage("Team Created Successfully");
      }
      setUsername(result.data.data.username);
      setPassword(result.data.data.password);
      fetchTeamsOfRoom();
      setTeamAssigned("");
      setTeamName("");
      setLoading(false);
    } catch (error) {
      console.log(error);
      setFailure(true);
      setFailureMessage("Team not Created successful");
    }
  };

  const fetchTeamsOfRoom = async () => {
    try {
      setLoading(true);

      const result = await axios.get(
        `/api/v1/participants/getAllParticipants?auctioneerID=${auctioneerId}`
      );
      setListOfTeams(result.data.participants);
      console.log(result.data.participants);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInfoButtonClick = (playerId) => {
    // Navigate to the route with the player ID appended
    navigate(`/auctioneer/teams/stats/${auctioneerId}/${playerId}`);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSuccess(false);
    setFailure(false);
  };

  const handleDelete = async (playerId) => {
    try {
      const participant = await axios.get(
        `/api/v1/participants/getParticipantsById/${playerId}`
      );
      const noOfPlayers = participant.data.data.PlayerCount;
      if (noOfPlayers === 0) {
        const result = await axios.delete(
          `/api/v1/participants/deleteParticipantsById/${playerId}`
        );
        if (result.data.success === true) {
          setSuccess(true);
          setSuccessMessage("Participant team deleted successfully");
        } else {
          setFailure(true);
          setFailureMessage("player not deleted");
        }
      }
      fetchTeamsOfRoom();
    } catch (error) {
      console.log(error);
      setFailure(true);
      setFailureMessage("error deleting team");
    }
  };

  useEffect(() => {
    fetchTeamsOfRoom();
  }, []);
  return (
    <>
      <AuctioneerNavbar />

      {loading ? (
        <Box
          sx={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress color="success" />
        </Box>
      ) : (
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
                  Create Team
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
                      label="Team's Name"
                      value={teamName}
                      onChange={(e) => setTeamName(e.target.value)}
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
                          (team) => team.name === e.target.value
                        );
                        setTeamAssigned(e.target.value);
                        setAssignedTeamLogo(selectedTeam.logo);
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
                        <MenuItem key={key} value={team.name}>
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <img
                              src={team.logo}
                              alt={team.name}
                              style={{ width: 24, marginRight: 8 }}
                            />
                            {team.name}
                          </div>
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    {isTeamCreated && (
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
                      onClick={handleCreateTeam}
                    >
                      Create Team
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
                  Teams in your Room
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
                  <Grid item md={1}>
                    <Typography
                      align="center"
                      sx={{
                        fontFamily: "Protest Riot",
                        color: "yellow",
                        fontSize: "20px",
                      }}
                    >
                      Photo
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
                      Team Name
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
                      Points
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
                      Player count
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
                      Balance
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
                      UserName
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
                      Delete
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
                  {listOfTeams.map((item, index) => (
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
                      <Grid item md={1}>
                        <Box sx={{ margin: "auto" }}>
                          <img src={item.iplTeamLogo} alt={item.Name} />
                        </Box>
                      </Grid>
                      <Grid item md={2}>
                        <Typography
                          align="center"
                          sx={{
                            fontFamily: "Protest Strike",
                            fontSize: "18px",
                          }}
                        >
                          {item.teamname}
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
                          {item.score}
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
                          {item.PlayerCount}
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
                          {item.balanceAmount}
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
                          {item.username}
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
                          <Button
                            variant="outlined"
                            color="error"
                            onClick={() => handleDelete(item._id)}
                          >
                            Delete
                          </Button>
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
                          <Button
                            onClick={() => handleInfoButtonClick(item._id)}
                          >
                            <InfoIcon />
                          </Button>
                        </Typography>
                      </Grid>
                    </React.Fragment>
                  ))}
                </Grid>
              </Box>
            </Box>
          </section>
          <ParticipantFooter />
        </Box>
      )}

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

export default AuctioneerTeamsPage;
