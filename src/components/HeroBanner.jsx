import {
  Box,
  Typography,
  Button,
  Stack,
  CircularProgress,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { fetchTrendingMovies, fetchMovieVideos } from '../api/tmdb';

// HeroBanner component: Displays a visually engaging banner with the top trending movie
export default function HeroBanner() {
  const [movie, setMovie] = useState(null);           // Holds the selected trending movie
  const [trailerUrl, setTrailerUrl] = useState('');   // Stores YouTube trailer URL
  const [loading, setLoading] = useState(true);       // Controls loading state

  // Fetch trending movie and its trailer on component mount
  useEffect(() => {
    const loadMovie = async () => {
      try {
        const results = await fetchTrendingMovies(); // Fetch trending movies
        const firstMovie = results[0];               // Pick the top trending movie
        setMovie(firstMovie);                        // Set it in state

        // Fetch trailer videos for the movie
        const videos = await fetchMovieVideos(firstMovie.id);
        const trailer = videos.find(
          (v) => v.type === 'Trailer' && v.site === 'YouTube' // Pick YouTube trailer
        );

        // Construct YouTube URL
        if (trailer) {
          setTrailerUrl(`https://www.youtube.com/watch?v=${trailer.key}`);
        }
      } catch (error) {
        console.error('Error loading hero banner:', error); // Handle any errors
      } finally {
        setLoading(false); // Stop loading spinner
      }
    };

    loadMovie();
  }, []);

  // Show loading spinner until movie data is ready
  if (loading || !movie) {
    return (
      <Box
        sx={{
          height: '80vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          bgcolor: 'black',
        }}
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }

  // Construct background and TMDb URL
  const backgroundImage = `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`;
  const tmdbLink = `https://www.themoviedb.org/movie/${movie.id}`;

  // Main banner UI
  return (
    <Box
      sx={{
        height: '80vh',
        backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0.3)), url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        alignItems: 'center',
        px: { xs: 4, md: 10 }, // Responsive padding
        pt: { xs: 10, md: 12 },
        color: '#fff',
        position: 'relative',
      }}
    >
      <Box sx={{ maxWidth: '600px' }}>
        {/* Movie title and overview */}
        <Typography variant="h2" fontWeight="bold">
          {movie.title?.toUpperCase()}
        </Typography>
        <Typography variant="h4" gutterBottom>
          {movie.original_title}
        </Typography>
        <Typography sx={{ mb: 2 }}>
          {movie.overview}
        </Typography>

        {/* Action buttons */}
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            color="primary"
            sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}
            href={tmdbLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            Watch Now
          </Button>

          {/* Only show Trailer button if available */}
          {trailerUrl && (
            <Button
              variant="outlined"
              color="primary"
              sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}
              href={trailerUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Trailer
            </Button>
          )}
        </Stack>
      </Box>
    </Box>
  );
}
