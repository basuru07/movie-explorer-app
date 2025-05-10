import React, { useState } from 'react';
import {
  Box,
  TextField,
  Typography,
  Button,
  Paper,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Login component: Handles user authentication (mock logic)
export default function Login() {
  const navigate = useNavigate(); // For programmatic navigation
  const [username, setUsername] = useState(''); // Store username input
  const [password, setPassword] = useState(''); // Store password input
  const [error, setError] = useState('');       // Error message if login fails

  // Handler to process login
  const handleLogin = () => {
    // Basic mock authentication check
    if (username === 'admin' && password === 'admin') {
      localStorage.setItem('loggedIn', 'true');         // Mark user as logged in
      localStorage.setItem('username', username);       // Save username
      navigate('/');                                     // Redirect to homepage
    } else {
      setError('Invalid username or password');          // Show error if credentials fail
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',             // Full viewport height
        backgroundColor: '#000',        // Dark background
        display: 'flex',                // Center content
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
      }}
    >
      {/* Login form container */}
      <Paper
        elevation={6}
        sx={{
          p: 4,
          backgroundColor: '#121212',  // Slightly lighter dark background
          color: 'white',
          width: '100%',
          maxWidth: 400,               // Max width for responsiveness
        }}
      >
        {/* Heading */}
        <Typography
          variant="h5"
          gutterBottom
          fontWeight="bold"
          color="#64b5f6"
        >
          User Login
        </Typography>

        {/* Username field */}
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)} // Update username state
          InputProps={{ style: { color: 'white' } }}    // White text
          InputLabelProps={{ style: { color: '#aaa' } }} // Grey label
        />

        {/* Password field */}
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // Update password state
          InputProps={{ style: { color: 'white' } }}    // White text
          InputLabelProps={{ style: { color: '#aaa' } }} // Grey label
        />

        {/* Error message display */}
        {error && (
          <Typography color="error" sx={{ mt: 1 }}>
            {error}
          </Typography>
        )}

        {/* Login button */}
        <Button
          variant="contained"
          fullWidth
          sx={{
            mt: 2,
            backgroundColor: '#64b5f6', // Primary blue
            color: '#000',              // Dark text on light button
            fontWeight: 'bold',
            '&:hover': {
              backgroundColor: '#42a5f5',
            },
          }}
          onClick={handleLogin}
        >
          LOGIN
        </Button>
      </Paper>
    </Box>
  );
}
