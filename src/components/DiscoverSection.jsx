import { useEffect, useState } from "react";
import { Box, Typography, Button, CircularProgress, useTheme } from "@mui/material";
import MovieCard from "./MovieCard";
import tmdb from "../api/tmdb";
import { Explore } from "@mui/icons-material";

// DiscoverSection Component: Displays a grid of popular movies fetched from TMDb
export default function DiscoverSection() {
  const theme = useTheme(); // Access current MUI theme (for dark/light mode support)
  const [movies, setMovies] = useState([]); // Stores the list of fetched movies
  const [visibleCount, setVisibleCount] = useState(6); // Controls how many movies to display
  const [loading, setLoading] = useState(true); // Tracks loading state

  // Fetch popular movies from TMDb API when component mounts
  useEffect(() => {
    const fetchDiscover = async () => {
      try {
        const res = await tmdb.get("/movie/popular"); // API call to get popular movies
        setMovies(res.data.results); // Save results in state
      } catch (err) {
        console.error("Error loading discover movies:", err);
      } finally {
        setLoading(false); // Stop loading spinner
      }
    };

    fetchDiscover();
  }, []);

  return (
    <Box
      sx={{
        mt: 10,
        px: 4,
        textAlign: "center",
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.background.default,
        py: 4,
      }}
    >
      {/* Section Header with Icon */}
      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 4,
        }}
      >
        <Explore sx={{ mr: 1.5, color: "#FF4444" }} />
        Discover
      </Typography>

      {/* Show loading spinner while fetching movies */}
      {loading ? (
        <Box
          sx={{
            height: "50vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: theme.palette.mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
          }}
        >
          <CircularProgress sx={{ color: "#87CEFA" }} />
        </Box>
      ) : (
        <>
          {/* Movie Grid */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: 4,
              "& > *": {
                animation: "fadeIn 0.5s ease-in", // Optional: CSS animation effect
              },
            }}
          >
            {/* Display visibleCount number of MovieCards */}
            {movies.slice(0, visibleCount).map((movie) => (
              <Box
                key={movie.id}
                sx={{
                  width: { xs: 150, sm: 180, md: 200 },
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-10px)",
                    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.5)",
                    cursor: "pointer",
                  },
                }}
              >
                <MovieCard movie={movie} />
              </Box>
            ))}
          </Box>

          {/* Load More Button: Show if there are more movies to display */}
          {visibleCount < movies.length && (
            <Box sx={{ mt: 6 }}>
              <Button
                variant="contained"
                onClick={() => setVisibleCount((prev) => prev + 6)} // Show 6 more movies on click
                sx={{
                  background: "linear-gradient(90deg, #87CEFA, #00B7EB)",
                  color: "#000",
                  fontWeight: "bold",
                  px: 3,
                  py: 1,
                  border: "none",
                  borderRadius: 1,
                  cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(0, 183, 235, 0.3)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    background: "#76bfe7",
                    boxShadow: "0 6px 16px rgba(0, 183, 235, 0.5)",
                    transform: "scale(1.05)",
                  },
                }}
              >
                Load More
              </Button>
            </Box>
          )}
        </>
      )}
    </Box>
  );
}
