import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import ThemeContextProvider from './context/ThemeContext';
import Favorites from './pages/Favorites';
import MovieDetails from './pages/MovieDetails';
import Login from './pages/Login';
import SearchHistory from './pages/SearchHistory';

function App() {
  return (
    <ThemeContextProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/history" element={<SearchHistory />} />

          {/* 👇 This ensures any unmatched route redirects to home */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </ThemeContextProvider>
  );
}

export default App;
