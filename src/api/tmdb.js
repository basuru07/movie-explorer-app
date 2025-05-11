import axios from 'axios';

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const tmdb = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

// ✅ Fetch trending movies
export const fetchTrendingMovies = async () => {
  const res = await tmdb.get('/trending/movie/week');
  return res.data.results;
};

// ✅ 🔥 Add this function to fetch trailer videos
export const fetchMovieVideos = async (movieId) => {
  const res = await tmdb.get(`/movie/${movieId}/videos`);
  return res.data.results;
};

export default tmdb;
