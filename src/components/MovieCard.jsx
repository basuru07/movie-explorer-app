import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Stack,
  IconButton,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import VisibilityIcon from '@mui/icons-material/Visibility';
import StarIcon from '@mui/icons-material/Star';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// MovieCard component displays an individual movie's card with image, title, metadata, and actions
export default function MovieCard({ movie }) {
  // Construct poster image URL or fallback placeholder
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
    : 'https://via.placeholder.com/300x450?text=No+Image';

  const [isFavorite, setIsFavorite] = useState(false); // Tracks if movie is in favorites
  const [viewCount, setViewCount] = useState(0);        // Tracks number of views
  const movieId = movie.id;

  // On mount, load favorite and view count status from localStorage
  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem('favorites') || '[]');
    setIsFavorite(favs.includes(movieId));

    const views = JSON.parse(localStorage.getItem('views') || '{}');
    setViewCount(views[movieId] || 0);
  }, [movieId]);

  // Toggle favorite state and update localStorage
  const toggleFavorite = (e) => {
    e.stopPropagation(); // Prevents navigation when clicking the icon
    const favs = JSON.parse(localStorage.getItem('favorites') || '[]');
    let updated;

    if (favs.includes(movieId)) {
      updated = favs.filter((id) => id !== movieId); // Remove from favorites
    } else {
      updated = [...favs, movieId]; // Add to favorites
    }

    localStorage.setItem('favorites', JSON.stringify(updated));
    setIsFavorite(!isFavorite); // Toggle state
  };

  // Handle when the card is clicked: increase view count and update localStorage
  const handleCardClick = () => {
    const views = JSON.parse(localStorage.getItem('views') || '{}');
    const updatedCount = (views[movieId] || 0) + 1;
    views[movieId] = updatedCount;
    localStorage.setItem('views', JSON.stringify(views));
    setViewCount(updatedCount);
  };

  return (
    <Box
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? '#2a2a2a' : '#f5f5f5',
        borderRadius: 2,
        overflow: 'hidden',
        boxShadow: 3,
      }}
    >
      {/* Card wraps the movie content and links to detail page */}
      <Card
        component={Link}
        to={`/movie/${movieId}`}
        onClick={handleCardClick}
        sx={{
          textDecoration: 'none',
          color: 'inherit',
          backgroundColor: 'transparent !important',
          height: '100%',
          boxShadow: 'none',
          borderRadius: 0,
        }}
      >
        {/* Movie poster image */}
        <CardMedia
          component="img"
          height="240"
          image={posterUrl}
          alt={movie.title}
          sx={{ objectFit: 'cover' }}
        />

        {/* Movie metadata content */}
        <CardContent sx={{ pb: '12px' }}>
          {/* Movie title */}
          <Typography
            variant="subtitle2"
            noWrap
            sx={{ fontWeight: 'bold', color: 'text.primary' }}
          >
            {movie.title}
          </Typography>

          {/* Metadata bar: release year, favorite icon, view count, rating */}
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mt={1}
            sx={{ color: 'text.secondary' }}
          >
            {/* Release Year */}
            <Typography variant="caption">
              {movie.release_date?.slice(0, 4) || 'N/A'}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {/* Favorite icon toggle */}
              <IconButton
                onClick={toggleFavorite}
                size="small"
                sx={{ color: isFavorite ? 'red' : 'gray' }}
              >
                {isFavorite ? (
                  <FavoriteIcon sx={{ fontSize: 16 }} />
                ) : (
                  <FavoriteBorderIcon sx={{ fontSize: 16 }} />
                )}
              </IconButton>

              {/* View count display */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3 }}>
                <VisibilityIcon sx={{ fontSize: 16 }} />
                <Typography variant="caption">{viewCount}</Typography>
              </Box>

              {/* Movie rating display */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3 }}>
                <StarIcon sx={{ fontSize: 16, color: 'gold' }} />
                <Typography variant="caption">
                  {movie.vote_average?.toFixed(1)}
                </Typography>
              </Box>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
