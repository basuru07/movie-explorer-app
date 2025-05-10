import React, { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import MovieCard from "../components/MovieCard";

// SearchHistory Component: Displays user's past searched movies stored in localStorage
export default function SearchHistory() {
  const theme = useTheme(); // Access current theme for dynamic styling
  const [searchHistory, setSearchHistory] = useState([]); // State to hold search history

  // On component mount, load search history from localStorage
  useEffect(() => {
    const history = JSON.parse(localStorage.getItem("searchHistory") || "[]");
    setSearchHistory(history);
  }, []);

  // Handler to clear search history
  const clearHistory = () => {
    localStorage.removeItem("searchHistory"); // Remove from storage
    setSearchHistory([]); // Clear local state
  };

  return (
    <Box
      sx={{
        bgcolor: theme.palette.background.default, // Theme-based background color
        color: theme.palette.text.primary,         // Theme-based text color
        minHeight: "100vh",                        // Full viewport height
        px: 4,
        pt: 12,                                     // Top padding to accommodate fixed header
      }}
    >
      {/* Header */}
      <Typography variant="h4" fontWeight="bold" mb={4}>
        Your Search History
      </Typography>

      {/* If there is search history, display cards; otherwise, show fallback message */}
      {searchHistory.length > 0 ? (
        <>
          {/* Clear history button */}
          <Button
            variant="outlined"
            onClick={clearHistory}
            sx={{ mb: 3, borderColor: "#64b5f6", color: "#64b5f6" }}
          >
            Clear History
          </Button>

          {/* MovieCard list layout */}
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap", // Allow wrapping on smaller screens
              gap: 3,           // Spacing between items
            }}
          >
            {searchHistory.map((movie) => (
              <Box key={movie.id} sx={{ width: 180 }}>
                <MovieCard movie={movie} />
              </Box>
            ))}
          </Box>
        </>
      ) : (
        // Fallback message when no history
        <Typography>No search history found.</Typography>
      )}
    </Box>
  );
}
