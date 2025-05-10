// src/App.jsx

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import ThemeContextProvider from './context/ThemeContext';
import Favorites from './pages/Favorites';
import MovieDetails from './pages/MovieDetails';
import Login from './pages/Login';
import SearchHistory from './pages/SearchHistory';

// Main App component that defines routing and theme context
function App() {
  return (
    // Wrap the entire app with the custom theme context provider
    <ThemeContextProvider>
      <Router>
        {/* Persistent Header component across all routes */}
        <Header />

        {/* Route definitions for different pages */}
        <Routes>
          {/* Home page */}
          <Route path="/" element={<Home />} />

          {/* Favorites page */}
          <Route path="/favorites" element={<Favorites />} />

          {/* Movie details page (dynamic route based on ID) */}
          <Route path="/movie/:id" element={<MovieDetails />} />

          {/* Login page */}
          <Route path="/login" element={<Login />} />

          {/* Search history page */}
          <Route path="/history" element={<SearchHistory />} />
        </Routes>
      </Router>
    </ThemeContextProvider>
  );
}

export default App;
