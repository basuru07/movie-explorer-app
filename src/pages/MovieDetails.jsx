import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Chip,
  Stack,
  CircularProgress,
  Avatar,
  Divider,
  Link,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarIcon from '@mui/icons-material/Star';
import tmdb from '../api/tmdb';

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await tmdb.get(`/movie/${id}`, {
          params: { append_to_response: 'videos,credits' },
        });
        setMovie(res.data);
        setCast(res.data.credits.cast.slice(0, 12));

        const trailer = res.data.videos.results.find(
          (vid) => vid.type === 'Trailer' && vid.site === 'YouTube'
        );
        setTrailerUrl(trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null);
      } catch (err) {
        console.error('Error fetching movie details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  if (loading) {
    return (
      <Box
        sx={{
          height: '70vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!movie) return <Typography>Movie not found.</Typography>;

  const {
    title,
    release_date,
    runtime,
    genres,
    overview,
    poster_path,
    vote_average,
    vote_count,
    credits,
  } = movie;

  const year = release_date?.slice(0, 4);
  const time = runtime ? `${Math.floor(runtime / 60)}h ${runtime % 60}m` : 'N/A';

  const posterUrl = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : 'https://via.placeholder.com/300x450?text=No+Image';

  const director = credits?.crew?.find((c) => c.job === 'Director')?.name || 'N/A';
  const writer = credits?.crew?.find((c) => c.job === 'Writer' || c.department === 'Writing')?.name || 'N/A';

  const tmdbRating = vote_average?.toFixed(1);
  const tmdbVotes = vote_count?.toLocaleString();

  return (
    <Box sx={{ pt: 10, pb: 6, backgroundColor: '#000', minHeight: '100vh', color: 'white' }}>
      <Box
        sx={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'flex-start',
          justifyContent: 'center',
          gap: { xs: 4, md: 6 },
          px: { xs: 2, md: 4 },
        }}
      >
        {/* Left: POSTER */}
        <Box
          sx={{
            flex: { md: '0 0 300px' },
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box
            component="img"
            src={posterUrl}
            alt={title}
            sx={{
              width: '100%',
              maxWidth: '300px',
              height: 'auto',
              borderRadius: '12px',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5)',
              transition: 'transform 0.3s',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
          />
        </Box>

        {/* Right: DETAILS */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
          }}
        >
          <Typography variant="h3" fontWeight="bold" sx={{ mb: 1 }}>
            {title} ({year})
          </Typography>

          <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap', gap: 1 }}>
            <Typography variant="body2" color="gray">
              {time}
            </Typography>
            {genres.map((genre) => (
              <Chip
                key={genre.id}
                label={genre.name}
                size="small"
                sx={{
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.2)' },
                }}
              />
            ))}
          </Stack>

          {/* Ratings Section */}
          <Stack direction="row" spacing={3} sx={{ flexWrap: 'wrap', gap: 2, mb: 2 }}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <FavoriteIcon sx={{ color: '#4CAF50', fontSize: 20 }} />
              <Typography variant="body2" sx={{ color: 'white' }}>
                {tmdbVotes}
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography sx={{ color: '#FFD700', fontSize: 16, fontWeight: 'bold' }}>
                TMDb
              </Typography>
              <Typography variant="body2" sx={{ color: 'white' }}>
                {tmdbRating}/10
              </Typography>
              <StarIcon sx={{ color: '#FFD700', fontSize: 20 }} />
            </Stack>
          </Stack>

          <Stack spacing={1.5}>
            <MetaRow label="Directed by" value={director} />
            <MetaRow label="Written by" value={writer} />
            <MetaRow label="Studio" value="N/A (not provided by TMDb)" />
            <MetaRow label="Video" value="720p (H.264 High 10)" />
            <MetaRow
              label="Audio"
              value={
                <Link href="#" underline="hover" sx={{ color: '#00b0ff' }}>
                  English (AC3 Stereo)
                </Link>
              }
            />
            <MetaRow
              label="Subtitles"
              value={
                <Link href="#" underline="hover" sx={{ color: '#ffd740' }}>
                  English (ASS)
                </Link>
              }
            />
          </Stack>

          {/* 🔵 Buttons */}
          <Stack direction="row" spacing={2}>
            <Box
              component="button"
              sx={{
                backgroundColor: '#90caf9',
                color: '#000',
                fontWeight: 'bold',
                px: 3,
                py: 1,
                border: 'none',
                borderRadius: 1,
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: '#64b5f6',
                },
              }}
            >
              WATCH NOW
            </Box>
            <Box
              component="button"
              onClick={() => trailerUrl && window.open(trailerUrl, '_blank')}
              disabled={!trailerUrl}
              sx={{
                backgroundColor: 'transparent',
                color: '#90caf9',
                fontWeight: 'bold',
                px: 3,
                py: 1,
                border: '2px solid #90caf9',
                borderRadius: 1,
                cursor: trailerUrl ? 'pointer' : 'not-allowed',
                opacity: trailerUrl ? 1 : 0.5,
                '&:hover': {
                  backgroundColor: trailerUrl ? 'rgba(144, 202, 249, 0.1)' : 'transparent',
                },
              }}
            >
              TRAILER
            </Box>
          </Stack>

          <Typography variant="body1" sx={{ color: '#ccc', lineHeight: 1.6 }}>
            {overview}
          </Typography>
        </Box>
      </Box>

      {/* Cast Section */}
      <Divider sx={{ my: 6, borderColor: 'rgba(255, 255, 255, 0.2)' }} />
      <Box sx={{ px: { xs: 2, md: 10 } }}>
        <Typography variant="h5" fontWeight="bold" mb={4} sx={{ color: 'white' }}>
          Cast
        </Typography>
        <Stack
          direction="row"
          spacing={4}
          sx={{
            overflowX: 'auto',
            pb: 2,
            '&::-webkit-scrollbar': { display: 'none' },
          }}
        >
          {cast.map((actor) => (
            <Box key={actor.id} sx={{ textAlign: 'center', minWidth: 120 }}>
              <Avatar
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                    : undefined
                }
                alt={actor.name}
                sx={{
                  width: 100,
                  height: 100,
                  mx: 'auto',
                  mb: 2,
                  border: '2px solid rgba(255, 255, 255, 0.1)',
                  transition: 'transform 0.3s',
                  '&:hover': { transform: 'scale(1.1)' },
                }}
              />
              <Typography variant="caption" fontWeight="bold" sx={{ color: 'white' }}>
                {actor.name}
              </Typography>
              <Typography variant="caption" sx={{ color: 'gray' }}>
                <br />
                {actor.character}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}

function MetaRow({ label, value }) {
  return (
    <Typography variant="body2" sx={{ color: 'gray' }}>
      <strong style={{ color: 'white', marginRight: 8 }}>{label}:</strong>
      {value}
    </Typography>
  );
}