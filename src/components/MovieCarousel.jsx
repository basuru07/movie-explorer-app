// src/components/MovieCarousel.jsx

import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import tmdb from '../api/tmdb'; // Custom Axios instance with TMDb API base URL and key

// MovieCarousel Component: Horizontally scrollable list of popular movie posters
export default function MovieCarousel() {
  const [movies, setMovies] = useState([]); // State to hold the fetched movies

  // Fetch popular movies from TMDb when component mounts
  useEffect(() => {
    const fetchPopular = async () => {
      try {
        const response = await tmdb.get('/movie/popular'); // API request to TMDb
        setMovies(response.data.results); // Store results in state
      } catch (error) {
        console.error('Error fetching popular movies:', error); // Log any errors
      }
    };

    fetchPopular();
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: 'rgba(255, 255, 255, 0.05)', // Light transparent background
        borderRadius: 4, // Rounded corners
        px: 2,
        py: 3,
        overflowX: 'auto', // Enable horizontal scrolling
        display: 'flex', // Flex layout for horizontal alignment
        gap: 2, // Gap between posters
        pb: 2,
        mt: 1,
        scrollSnapType: 'x mandatory', // Enable scroll snapping
        '&::-webkit-scrollbar': { display: 'none' }, // Hide scrollbar for WebKit browsers
      }}
    >
      {/* Render each movie as a clickable poster */}
      {movies.map((movie) => (
        <Link
          key={movie.id}
          to={`/movie/${movie.id}`} // Navigate to movie details page on click
          style={{ textDecoration: 'none' }}
        >
          <Box
            sx={{
              minWidth: 180,          // Fixed width for scroll layout
              height: 270,            // Poster height
              borderRadius: 2,
              overflow: 'hidden',
              scrollSnapAlign: 'start', // Snap start of each poster into view
              border: '2px solid transparent',
              transition: '0.3s',     // Smooth hover animation
              '&:hover': {
                borderColor: 'primary.main', // Highlight border on hover
                transform: 'scale(1.05)',   // Slight zoom effect
              },
            }}
          >
            {/* Poster Image */}
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w300${movie.poster_path}` // Poster from TMDb
                  : 'https://via.placeholder.com/300x450?text=No+Image'   // Fallback image
              }
              alt={movie.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover', // Maintain aspect ratio and fill container
              }}
            />
          </Box>
        </Link>
      ))}
    </Box>
  );
}
