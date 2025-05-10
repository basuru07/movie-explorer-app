import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MovieCard from '../components/MovieCard';
import { fetchTrendingMovies } from '../api/tmdb';

// Favorites component displays the list of user's favorite movies
export default function Favorites() {
  const theme = useTheme(); // Access current theme for dynamic styling
  const [favoriteMovies, setFavoriteMovies] = useState([]); // Store filtered favorite movies

  // Fetch favorite movie IDs from localStorage and filter trending movies
  useEffect(() => {
    const loadFavorites = async () => {
      const favIds = JSON.parse(localStorage.getItem('favorites') || '[]'); // Get saved favorite IDs
      const all = await fetchTrendingMovies(); // Fetch trending movies as source dataset
      const filtered = all.filter((movie) => favIds.includes(movie.id)); // Match only favorites
      setFavoriteMovies(filtered); // Update state
    };

    loadFavorites();
  }, []);

  return (
    <Box
      sx={{
        bgcolor: theme.palette.background.default, // Themed background
        color: theme.palette.text.primary,         // Themed text color
        minHeight: '100vh',                        // Ensure full viewport height
        px: 4,
        pt: 12,                                     // Top padding for header alignment
      }}
    >
      {/* Section heading */}
      <Typography variant="h4" fontWeight="bold" mb={4}>
        Your Favorite Movies
      </Typography>

      {/* Conditional rendering: show grid if favorites exist */}
      {favoriteMovies.length > 0 ? (
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 3, // Spacing between cards
          }}
        >
          {/* Render each favorite movie as a MovieCard */}
          {favoriteMovies.map((movie) => (
            <Box key={movie.id} sx={{ width: 180 }}>
              <MovieCard movie={movie} />
            </Box>
          ))}
        </Box>
      ) : (
        // Show fallback message if no favorites
        <Typography>No favorites added yet.</Typography>
      )}
    </Box>
  );
}
