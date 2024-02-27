
import React from 'react';
import { AppBar, Toolbar, Link, Typography } from '@mui/material';

const Footer = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#B2AEFF', color: '#000000' }}>
      <Toolbar sx={{ justifyContent: 'center', alignItems: 'center', padding: '10px' }}>
        <nav>
          <Typography variant="body1" component="span">
            <Link href="#" color="inherit" sx={{ mr: 2 }}>Home</Link>
            <Link href="#" color="inherit" sx={{ mr: 2 }}>Teams</Link>
            <Link href="#" color="inherit" sx={{ mr: 2 }}>Schedule</Link>
            <Link href="#" color="inherit" sx={{ mr: 2 }}>News</Link>
            <Link href="#" color="inherit" sx={{ mr: 2 }}>Tickets</Link>
            <Link href="#" color="inherit" sx={{ mr: 2 }}>About IPL</Link>
            <Link href="#" color="inherit" sx={{ mr: 2 }}>Contact Us</Link>
          </Typography>
        </nav>
      </Toolbar>
      <Typography variant="body2" align="center" sx={{ padding: '10px' }}>
        &copy; 2024 IPL. All Rights Reserved.
      </Typography>
    </AppBar>
  );
}

export default Footer;
