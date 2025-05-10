// src/context/ThemeContext.js

import { createContext, useMemo, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Create a context with a default placeholder toggle function
export const ColorModeContext = createContext({ toggleColorMode: () => {} });

// ThemeContextProvider: Wraps the app and provides theme mode + toggle function
export default function ThemeContextProvider({ children }) {
  // Initialize theme mode from localStorage or default to 'dark'
  const [mode, setMode] = useState(localStorage.getItem('theme') || 'dark');

  // Memoized toggle function to switch between light and dark modes
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
          const newMode = prevMode === 'light' ? 'dark' : 'light'; // Toggle logic
          localStorage.setItem('theme', newMode); // Persist to localStorage
          return newMode;
        });
      },
    }),
    [] // Only define once during component mount
  );

  // Create a theme object based on current mode (light/dark)
  const theme = useMemo(() => createTheme({ palette: { mode } }), [mode]);

  // Provide the toggle function and theme to children via context + ThemeProvider
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
}
