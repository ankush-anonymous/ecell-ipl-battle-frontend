import React from "react";
import AuctioneerNavbar from "../Components/AuctioneerNavbar";
import { Box, Grid, Typography } from "@mui/material";

const listOfPlayers = [
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
];

const AuctioneerParticipantsPlayers = () => {
  return (
    <>
      <AuctioneerNavbar />

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
              Players of your Team
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
              {/* Table Header */}
              <Grid item md={2}>
                <Typography
                  align="center"
                  k
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
                  Name
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
                  Country
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
                  IplPoints
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
                  SoldPrice
                </Typography>
              </Grid>

              {/* Table Body - Map the array */}
              {listOfPlayers.map((item, index) => (
                <React.Fragment key={index}>
                  <Grid item md={2}>
                    <Typography
                      align="center"
                      sx={{ fontFamily: "Protest Strike", fontSize: "18px" }}
                    >
                      {item.SlNo}
                    </Typography>
                  </Grid>
                  <Grid item md={2}>
                    <img src={item.image} alt={item.Name} />
                  </Grid>
                  <Grid item md={2}>
                    <Typography
                      align="center"
                      sx={{ fontFamily: "Protest Strike", fontSize: "18px" }}
                    >
                      {item.firstname} {item.surname}
                    </Typography>
                  </Grid>
                  <Grid item md={2}>
                    <Typography
                      align="center"
                      sx={{ fontFamily: "Protest Strike", fontSize: "18px" }}
                    >
                      {item.country}
                    </Typography>
                  </Grid>

                  <Grid item md={2}>
                    <Typography
                      align="center"
                      sx={{ fontFamily: "Protest Strike", fontSize: "18px" }}
                    >
                      {item.iplrating}
                    </Typography>
                  </Grid>
                  <Grid item md={2}>
                    <Typography
                      align="center"
                      sx={{ fontFamily: "Protest Strike", fontSize: "18px" }}
                    >
                      {item.SoldPrice}
                    </Typography>
                  </Grid>
                </React.Fragment>
              ))}
            </Grid>
          </Box>
        </Box>
      </section>
    </>
  );
};

export default AuctioneerParticipantsPlayers;
