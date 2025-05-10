// src/components/ThemeToggle.jsx

import { useContext } from 'react';
import { ColorModeContext } from '../context/ThemeContext'; // Custom context for theme toggling
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import { useTheme } from '@mui/material/styles';

// ThemeToggle Component: Icon button to switch between light and dark modes
export default function ThemeToggle() {
  const { toggleColorMode } = useContext(ColorModeContext); // Access toggle function from context
  const theme = useTheme(); // Access the current theme (light or dark)

  // Set icon color based on current theme mode
  const iconColor = theme.palette.mode === 'dark' ? '#64b5f6' : '#ffffff';

  return (
    // Clicking the icon will toggle the theme mode
    <IconButton onClick={toggleColorMode} sx={{ color: iconColor }}>
      <Brightness4Icon /> {/* Moon icon indicating theme toggle */}
    </IconButton>
  );
}
