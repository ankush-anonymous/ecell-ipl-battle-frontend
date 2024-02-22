import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// import React from 'react';
// import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Avatar, IconButton, Paper } from '@mui/material';
// import InfoIcon from '@mui/icons-material/Info';
// import { createTheme, ThemeProvider } from '@mui/material/styles';

// // Theme configuration using the previous color scheme and including Ubuntu font
// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#403E6A',
//     },
//     secondary: {
//       main: '#B2AEFF',
//     },
//     background: {
//       default: '#232329',
//       paper: '#121212',
//     },
//     text: {
//       primary: '#B2AEFF',
//       secondary: '#FFFFFF',
//     },
//   },
//   typography: {
//     fontFamily: '"Ubuntu", sans-serif', // Ubuntu font applied globally
//     h4: {
//       fontSize: '1.75rem',
//       color: 'text.primary',
//     },
//     body1: {
//       color: 'text.secondary',
//       fontSize: '1rem',
//     },
//   },
//   components: {
//     MuiTableCell: {
//       styleOverrides: {
//         root: {
//           borderBottom: 'none',
//         },
//         head: {
//           fontSize: '1rem',
//           fontWeight: 'bold',
//           color: 'text.primary',
//         },
//       },
//     },
//     MuiAvatar: {
//       styleOverrides: {
//         root: {
//           width: 116,
//           height: 116, // Increased size
//         },
//       },
//     },
//     MuiIconButton: {
//       styleOverrides: {
//         root: {
//           color: 'text.primary',
//         },
//       },
//     },
//     MuiTypography: {
//       styleOverrides: {
//         root: {
//           color: 'text.primary',
//         },
//       },
//     },
//   },
// });

// const iplData = [
//   {
//         id: 1,
//         logo: 'data:image/jpeg;base64,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',
//         name: 'Royal challengers bangalore',
//         amount: '1.5M',
//       },
//       {
//         id: 2,
//         logo: 'https://via.placeholder.com/40',
//         name: 'Chennai super kings',
//         amount: '2.0M',
//       },
//       {
//         id: 3,
//         logo: 'https://via.placeholder.com/40',
//         name: 'Mumbai Indians',
//         amount: '1.2M',
//       },
// ];

// // ... (other imports and theme configuration remain the same)

// const ParticipantsStatistics = () => {
//   return (
//     <TableContainer component={Paper} sx={{ bgcolor: 'background.paper', borderRadius: '10px', boxShadow: 'none' }}>
//       <Table aria-label="participants statistics">
//         <TableHead>
//           <TableRow>
//             <TableCell sx={{ color: 'text.secondary', borderBottom: 'none' }}>S.No</TableCell>
//             <TableCell sx={{ color: 'text.primary', borderBottom: 'none' }}>Logo</TableCell>
//             <TableCell sx={{ color: 'text.primary', borderBottom: 'none' }}>Name</TableCell>
//             <TableCell sx={{ color: 'text.primary', borderBottom: 'none' }}>Amount</TableCell>
//             <TableCell sx={{ color: 'text.primary', borderBottom: 'none' }}>Info</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {iplData.map((player, index) => (
//             <TableRow key={player.id}>
//               <TableCell sx={{ color: 'text.secondary', borderBottom: 'none', fontFamily: '"Roboto", sans-serif' }}>
//                 {index + 1}
//               </TableCell>
//               <TableCell sx={{ borderBottom: 'none' }}>
//                 <Avatar 
//                   src={player.logo} 
//                   alt={player.name} 
//                   sx={{ width: 116, height: 116 }} // Increased size
//                 />
//               </TableCell>
//               <TableCell sx={{ color: 'red', borderBottom: 'none', fontSize: '1.25rem' }}>{player.name}</TableCell> {/* Color and font size updated */}
//               <TableCell sx={{ color: 'text.secondary', borderBottom: 'none' }}>{player.amount}</TableCell>
//               <TableCell sx={{ borderBottom: 'none' }}>
//                 <IconButton aria-label="info" size="large">
//                   <InfoIcon sx={{ color: 'text.primary' }} />
//                 </IconButton>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// };

// // ... (iplData array and ParticipantsStatistics component remain the same)

// const App = () => {
//   return (
//     <ThemeProvider theme={theme}>
//       <Box sx={{ p: 3 }}>
//         <Typography variant="h4" gutterBottom component="div">
//           Participants Statistics
//         </Typography>
//         <ParticipantsStatistics />
//       </Box>
//     </ThemeProvider>
//   );
// };

// export default App;








// import React, { useState } from 'react';
// import { Card, CardContent, Typography, Button, Grid, TextField, Paper, Box } from '@mui/material';
// import { createTheme, ThemeProvider } from '@mui/material/styles';

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#403E6A', // Dark purple
//     },
//     secondary: {
//       main: '#B2AEFF', // Light purple
//     },
//     background: {
//       default: '#232329', // Off-black/dark gray
//       paper: '#121212', // Black
//     },
//     text: {
//       primary: '#B2AEFF', // Light purple for text
//       secondary: '#FFFFFF', // White for less emphasis
//     },
//   },
//   typography: {
//     fontFamily: '"Ubuntu", "Roboto", "Helvetica", "Arial", sans-serif', // Adjusted with a more attractive font
//     h4: {
//       fontWeight: 700,
//       color: '#B2AEFF',
//     },
//     subtitle1: {
//       fontSize: '1.1rem',
//       color: '#FFFFFF',
//       fontWeight: 500, // Slightly bolder for better readability
//     },
//     body1: {
//       color: '#B2AEFF',
//     },
//   },
//   components: {
//     MuiCard: {
//       styleOverrides: {
//         root: {
//           backgroundColor: '#121212',
//           borderRadius: '10px',
//           boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.25)', // Added shadow for depth
//         },
//       },
//     },
//     MuiButton: {
//       styleOverrides: {
//         root: {
//           fontWeight: 'bold',
//           textTransform: 'none',
//           color: '#121212',
//           borderRadius: '8px', // Rounded corners for buttons
//         },
//         containedPrimary: {
//           backgroundColor: '#B2AEFF',
//           '&:hover': {
//             backgroundColor: '#9e9be2',
//             // Adding a subtle shadow on hover for a "lift" effect
//             boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.2)',
//           },
//         },
//         outlined: {
//           border: 1px solid #B2AEFF,
//           color: '#B2AEFF',
//           '&:hover': {
//             backgroundColor: 'rgba(178, 174, 255, 0.1)',
//             // Enhance hover effect with a shadow
//             boxShadow: '0px 2px 10px rgba(178, 174, 255, 0.2)',
//           },
//         },
//       },
//     },
//     MuiTextField: {
//       styleOverrides: {
//         root: {
//           '& label.Mui-focused': {
//             color: '#B2AEFF',
//           },
//           '& .MuiOutlinedInput-root': {
//             '& fieldset': {
//               borderColor: '#B2AEFF',
//             },
//             '&:hover fieldset': {
//               borderColor: '#9e9be2',
//             },
//             '&.Mui-focused fieldset': {
//               borderColor: '#B2AEFF',
//             },
//           },
//         },
//       },
//     },
//   },
// });

// // Your App component and other components remain unchanged


// const players = [
//   // Include your player data here with imageUrl added
//   {
//     Name: 'Virat Kohli',
    
//     country: 'Neverland',
//     dob: '1990-01-01',
//     age: 32,
//     specialism: 'Allrounder',
//     battingStyle: 'Right-hand bat',
//     bowlingStyle: 'Offbreak',
//     soldPrice: '1.5M',
//     imageUrl: '',
//   },
//   {
//         firstName: 'Jane',
//         surname: 'Smith',
//         country: 'Wonderland',
//         dob: '1992-02-02',
//         age: 30,
//         specialism: 'Batsman',
//         battingStyle: 'Left-hand bat',
//         bowlingStyle: 'Legbreak',
        
//         soldPrice: '1.2M',
        
//       },
//       {
//         firstName: 'Alice',
//         surname: 'Brown',
//         country: 'Dreamland',
//         dob: '1993-03-03',
//         age: 29,
//         specialism: 'Bowler',
//         battingStyle: 'Right-hand bat',
//         bowlingStyle: 'Fast-medium',
       
//         soldPrice: '950K',
      
//       }
// ];

// const PlayerCard = ({ player }) => (
//   <Card raised elevation={6} sx={{ 
//     minWidth: 275, 
//     maxWidth: { xs: '100%', sm: '90%', md: '80%', lg: '65%' }, // Increasing the width based on the screen size
//     m: { xs: 2, md: 'auto' }, // Centering the card on larger screens
//     p: 3, // Adding more padding inside the card for better spacing
//     bgcolor: 'background.default', // Using theme background color
//     color: 'text.primary', // Using theme text color
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'center', // Centers the content vertically
//     alignItems: 'center', // Align items in the center
//     textAlign: 'center', // Center text alignment
//     boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.25)' // Enhanced shadow for depth
//   }}>
//     <CardContent>
//       <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//         <img src={player.imageUrl} alt={${player.Name} ${player.surname}} style={{ width: 200, height: 200, borderRadius: '50%', marginBottom: '20px' }} />
//         <Typography variant="h3" component="h2" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main', fontSize: '2.5rem' }}>
//           {player.Name} 
//         </Typography>
//         <Typography variant="h6" component="h3" color="secondary" gutterBottom sx={{ fontSize: '1.25rem' }}>
//           {player.country}
//         </Typography>
//         <Typography variant="subtitle1" gutterBottom sx={{ fontSize: '1.1rem', fontWeight: 'medium', mb: 2 }}>
//           Specialism: {player.specialism}
//         </Typography>
//         <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 'bold', color: 'secondary.main', fontSize: '1.5rem' }}>
//           Sold Price: {player.soldPrice}
//         </Typography>
//       </Box>
//       <Box mt={2} sx={{ width: '100%' }}>
//         <TextField fullWidth label="Transfer to" variant="outlined" margin="normal" sx={{ bgcolor: 'background.paper', borderRadius: 1 }} />
//         <TextField fullWidth label="Amount" variant="outlined" margin="normal" sx={{ bgcolor: 'background.paper', borderRadius: 1 }} />
//         <Grid container spacing={2} mt={2}>
//           <Grid item xs={6}>
//             <Button variant="outlined" fullWidth sx={{ borderColor: 'secondary.main', color: 'secondary.main', '&:hover': { bgcolor: 'rgba(178, 174, 255, 0.1)' } }}>Pass</Button>
//           </Grid>
//           <Grid item xs={6}>
//             <Button variant="contained" color="primary" fullWidth>TRANSFER</Button>
//           </Grid>
//         </Grid>
//       </Box>
//     </CardContent>
//   </Card>
// );

// const App = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const handlePrevious = () => {
//     setCurrentIndex((prevIndex) => prevIndex > 0 ? prevIndex - 1 : players.length - 1);
//   };

//   const handleNext = () => {
//     setCurrentIndex((prevIndex) => prevIndex < players.length - 1 ? prevIndex + 1 : 0);
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <Paper style={{
//         backgroundImage: url('cricket-background.jpg'),
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         width: '100%',
//         height: '100vh',
//         position: 'fixed',
//         top: 0,
//         left: 0,
//         zIndex: -1,
//       }} />
//       <Grid container spacing={2} justifyContent="center" alignItems="center" style={{ height: '100vh', padding: '2rem', position: 'relative' }}>
//         <Grid item xs={12} md={8} lg={6}>
//           <PlayerCard player={players[currentIndex]} />
//           <Grid container spacing={2} justifyContent="space-between" mt={2}>
//             <Grid item>
//               <Button variant="contained" color="secondary" onClick={handlePrevious}>Prev</Button>
//             </Grid>
//             <Grid item>
//               <Button variant="contained" color="secondary" onClick={handleNext}>Next</Button>
//             </Grid>
//           </Grid>
//         </Grid>
//       </Grid>
//     </ThemeProvider>
//   );
// };

// export default App;