import { useEffect, useState } from "react";
import { Box, Typography, Stack, CircularProgress, useTheme } from "@mui/material";
import { Whatshot, Star, Add, FlashOn } from "@mui/icons-material";
import { fetchTrendingMovies } from "../api/tmdb";
import MovieCard from "./MovieCard";
import GenreFilter from "./GenreFilter";

const genreMap = {
  Action: 28,
  Adventure: 12,
  Animation: 16,
  Comedy: 35,
  Fiction: 878,
  Heroes: 14,
};

export default function TrendingSection() {
  const theme = useTheme();
  const [movies, setMovies] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("Fiction");
  const [activeTab, setActiveTab] = useState("Popular");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadTrending = async () => {
      setLoading(true);
      try {
        const all = await fetchTrendingMovies();
        const genreId = genreMap[selectedGenre];
        let filtered = all.filter((m) => m.genre_ids.includes(genreId));

        if (activeTab === "Popular") {
          filtered = [...filtered].sort((a, b) => b.vote_average - a.vote_average);
        } else if (activeTab === "Recently Added") {
          filtered = [...filtered].sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
        } else if (activeTab === "Premium") {
          filtered = filtered.filter((m) => m.vote_average > 7.5);
        }

        setMovies(filtered);
      } catch (err) {
        console.error("Error fetching trending movies:", err);
      } finally {
        setLoading(false);
      }
    };

    loadTrending();
  }, [selectedGenre, activeTab]);

  const isDark = theme.palette.mode === "dark";

  const tabStyle = (tab) => ({
    cursor: "pointer",
    textTransform: "uppercase",
    fontWeight: "bold",
    fontSize: "14px",
    color: activeTab === tab ? (isDark ? "#000" : "#fff") : "#87CEFA",
    background:
      activeTab === tab ? "linear-gradient(90deg,#00B7EB, #00B7EB)" : "transparent",
    px: 3,
    py: 1,
    border: "none",
    borderRadius: 1,
    boxShadow: activeTab === tab ? "0 4px 12px rgba(0, 183, 235, 0.3)" : "none",
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
    "&:hover": {
      background: "#76bfe7",
      color: isDark ? "#000" : "#000",
      boxShadow: "0 4px 12px rgba(0, 183, 235, 0.3)",
    },
  });

  return (
    <Box
      sx={{
        mt: 8,
        textAlign: "center",
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.background.default,
        py: 4,
      }}
    >
      {/* Section Header */}
      <Stack
        direction="row"
        spacing={4}
        justifyContent="center"
        alignItems="center"
        mb={4}
        sx={{ flexWrap: "wrap", gap: 2 }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{ display: "flex", alignItems: "center" }}
        >
          <Whatshot sx={{ mr: 1.5, color: "#FF4444" }} />
          Trending
        </Typography>

        <Typography
          variant="body2"
          onClick={() => setActiveTab("Popular")}
          sx={tabStyle("Popular")}
        >
          <Star fontSize="small" sx={{ mr: 1, color: "#FFD700" }} />
          Popular
        </Typography>

        <Typography
          variant="body2"
          onClick={() => setActiveTab("Recently Added")}
          sx={tabStyle("Recently Added")}
        >
          <Add fontSize="small" sx={{ mr: 1, color: "#4CAF50" }} />
          Recently Added
        </Typography>

        <Typography
          variant="body2"
          onClick={() => setActiveTab("Premium")}
          sx={tabStyle("Premium")}
        >
          <FlashOn fontSize="small" sx={{ mr: 1, color: "#FF9800" }} />
          Premium
        </Typography>
      </Stack>

      {/* Genre Selector */}
      <GenreFilter
        genres={Object.keys(genreMap)}
        selected={selectedGenre}
        onSelect={setSelectedGenre}
      />

      {/* Movie Grid */}
      {loading ? (
        <Box
          sx={{
            height: "50vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.2)",
          }}
        >
          <CircularProgress sx={{ color: "#87CEFA" }} />
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: 4,
            px: { xs: 2, md: 4 },
            mt: 4,
            "& > *": {
              animation: "fadeIn 0.5s ease-in",
            },
          }}
        >
          {movies.length > 0 ? (
            movies.map((movie) => (
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
            ))
          ) : (
            <Typography variant="body1" sx={{ color: theme.palette.text.secondary, py: 4 }}>
              No movies found in this genre.
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
}
