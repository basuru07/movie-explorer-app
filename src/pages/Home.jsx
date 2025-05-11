// src/pages/Home.jsx

import { Box, Typography } from "@mui/material";
import HeroBanner from "../components/HeroBanner";
import MovieCarousel from "../components/MovieCarousel";
import Footer from "../components/Footer";
import TrendingSection from '../components/TrendingSection';
import DiscoverSection from '../components/DiscoverSection';

// Home page component that combines various sections of the homepage
export default function Home() {
  return (
    <Box sx={{ bgcolor: "background.default", color: "text.primary" }}>
      
      {/* Hero section: top banner with featured movie */}
      <HeroBanner />

      {/* Popular Movies section: floated over the bottom of HeroBanner */}
      <Box
        sx={{
          mt: "-130px", // Negative margin to overlap the HeroBanner
          px: { xs: 3, md: 10 }, // Responsive horizontal padding
          pb: 6,
          position: "relative",
          zIndex: 5, // Ensure it's layered above the HeroBanner
        }}
      >
        {/* Card-like container for Popular Movies carousel */}
        <Box
          sx={{
            bgcolor: "rgba(0,0,0,0.6)", // Semi-transparent black background
            borderRadius: 4, // Rounded corners
            px: 3,
            py: 3,
          }}
        >
          <Typography
            variant="h5"
            sx={{ mb: 2, color: "#fff", fontWeight: "bold" }}
          >
            Popular Movies
          </Typography>

          {/* Horizontally scrollable movie posters */}
          <MovieCarousel />
        </Box>
      </Box>

      {/* Trending Section: displays trending movies in grid or carousel format */}
      <TrendingSection />
      
      {/* Discover Section: shows additional movie recommendations */}
      <DiscoverSection />
      
      {/* Footer: contains site links and copyright */}
      <Footer />
    </Box>
  );
}
