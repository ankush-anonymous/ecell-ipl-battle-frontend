import React from 'react';
import ParticipantFooter from "../Components/ParticipantFooter";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Avatar,
  IconButton,
  Paper,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3A3768',
    },
    secondary: {
      main: '#A9A6FF',
    },
    background: {
      default: '#000000', // Background color set to black
      paper: '#18181B',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#FFFFFF',
    },
    
  },
  typography: {
    fontFamily: '"Ubuntu", sans-serif',
    h4: {
      fontSize: '3.25rem',
      fontWeight: 'bold',
      color: 'text.primary',
    },
    body1: {
      color: 'text.secondary',
      fontSize: '1.25rem',
    },
  },
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
          padding: '16px',
          fontSize: '1.45rem',
          color: '#FFFFFF',
        },
        head: {
          fontSize: '1.5rem',
          fontWeight: 'bold',
          color: '#FFFFFF',
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:nth-of-type(odd)': {
            backgroundColor: '#3A3768',
          },
          '&:nth-of-type(even)': {
            backgroundColor: '#322f5a',
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          width: 124,
          height: 124,
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          '&.team-name': {
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#FF0000',
          },
        },
      },
    },
  },
});

const iplData = [
  {
    auctionerId: 1,
    teamLogo: '', 
    teamName: 'Royal Challengers Bangalore',
    balanceAmount: '1.5M',
    playerCount: 24,
  },
  {
    auctionerId: 2,
    teamLogo: 'https://via.placeholder.com/40',
    teamName: 'Chennai Super Kings',
    balanceAmount: '2.0M',
    playerCount: 24,
  },
  {
    auctionerId: 3,
    teamLogo: 'https://via.placeholder.com/40',
    teamName: 'Mumbai Indians',
    balanceAmount: '1.2M',
    playerCount: 24,
  },
];


const ParticipantStatsPage = () => {
    return (
      <ThemeProvider theme={theme}>
        <Box sx={{
          p: 3,
          maxWidth: 'calc(100% - 204px)',
          margin: 'auto',
          bgcolor: 'background.default',
          color: 'text.primary',
          borderRadius: '10px',
        }}>
          <Typography variant="h4" gutterBottom component="div">
            Participants Statistics
          </Typography>
          <TableContainer component={Paper} sx={{ bgcolor: 'background.paper', borderRadius: '10px', boxShadow: 'none', overflow: 'hidden' }}>
            <Table aria-label="participants statistics">
              <TableHead>
                <TableRow>
                  <TableCell>S.No</TableCell>
                  <TableCell>Team Logo</TableCell>
                  <TableCell>Team Name</TableCell>
                  <TableCell>Balance Amount</TableCell>
                  <TableCell>Player Count</TableCell>
                  <TableCell>Info</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {iplData.map((team, index) => (
                  <TableRow key={team.auctionerId}>
                    <TableCell style={{ fontFamily: 'Roboto Slab' }}>{index + 1}</TableCell>
                    <TableCell>
                      <Avatar src={team.teamLogo} alt={team.teamName} />
                    </TableCell>
                    <TableCell>
                      <Typography className="team-name">{team.teamName}</Typography>
                    </TableCell>
                    <TableCell>{team.balanceAmount}</TableCell>
                    <TableCell>{team.playerCount}</TableCell>
                    <TableCell>
                      <IconButton aria-label="info" size="large">
                        <InfoIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <ParticipantFooter/>
      </ThemeProvider>
    );
  };
  
  export default ParticipantStatsPage;