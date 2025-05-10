// Importing necessary MUI components and icons
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  TextField,
  Paper,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import tmdb from "../api/tmdb";
import ThemeToggle from "./ThemeToggle";
import LoginIcon from "@mui/icons-material/Login";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

// Header component handles top navigation bar and search
export default function Header({ toggleDarkMode, darkMode }) {
  // State hooks for search, login status, and dropdown menu
  const [query, setQuery] = useState(""); // Input from search field
  const [suggestions, setSuggestions] = useState([]); // Search suggestions from TMDb API
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("loggedIn") === "true"
  );
  const [username, setUsername] = useState(
    localStorage.getItem("username") || ""
  );
  const [anchorEl, setAnchorEl] = useState(null); // Anchor element for account menu
  const open = Boolean(anchorEl); // Boolean for menu open state
  const navigate = useNavigate();

  // Check login status on mount and when localStorage changes
  useEffect(() => {
    const checkLoginStatus = () => {
      const status = localStorage.getItem("loggedIn") === "true";
      setLoggedIn(status);
      setUsername(localStorage.getItem("username") || "");
    };

    checkLoginStatus();
    window.addEventListener("storage", checkLoginStatus); // Listen for storage updates
    return () => window.removeEventListener("storage", checkLoginStatus);
  }, []);

  // Fetch search suggestions when query changes
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!query.trim()) {
        setSuggestions([]);
        return;
      }

      try {
        const res = await tmdb.get(
          `/search/movie?query=${encodeURIComponent(query)}`
        );
        const movie = res.data.results[0];
        if (movie) {
          localStorage.setItem("lastSearchedMovie", JSON.stringify(movie));
        }
        setSuggestions(res.data.results.slice(0, 5)); // Limit suggestions
      } catch (err) {
        console.error("Error fetching suggestions:", err);
        setSuggestions([]);
      }
    };

    const timeout = setTimeout(fetchSuggestions, 300); // Debounce
    return () => clearTimeout(timeout);
  }, [query]);

  // Navigate to search page on Enter key
  const handleSearch = (e) => {
    if (e.key === "Enter" && query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
      setSuggestions([]);
      setQuery("");
    }
  };

  // When a suggestion is selected
  const handleSelect = (movie) => {
    const history = JSON.parse(localStorage.getItem("searchHistory") || "[]");
    const updatedHistory = history.filter((m) => m.id !== movie.id);
    updatedHistory.unshift(movie); // Add to top
    localStorage.setItem(
      "searchHistory",
      JSON.stringify(updatedHistory.slice(0, 10))
    );
    localStorage.setItem("lastSearchedMovie", JSON.stringify(movie));
    navigate(`/movie/${movie.id}`);
    setSuggestions([]);
    setQuery("");
  };

  // Open and close handlers for account menu
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Get the last searched movie for menu option
  const lastMovie = localStorage.getItem("lastSearchedMovie")
    ? JSON.parse(localStorage.getItem("lastSearchedMovie"))
    : null;

  return (
    <AppBar
      position="absolute"
      color="transparent"
      elevation={0}
      sx={{ zIndex: 10 }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* App logo / brand */}
        <Typography variant="h6" fontWeight="bold" color="white">
          <Link to="/" style={{ textDecoration: "none", color: "#64b5f6" }}>
            Movie Explorer
          </Link>
        </Typography>

        {/* Right side controls: nav buttons, search, account */}
        <Box
          sx={{
            position: "relative",
            display: "flex",
            gap: 2,
            alignItems: "center",
          }}
        >
          {/* Home button */}
          <Button component={Link} to="/" sx={{ color: "#64b5f6" }}>
            HOME
          </Button>

          {/* Search box with suggestions dropdown */}
          <Box sx={{ position: "relative" }}>
            <TextField
              size="small"
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleSearch}
              sx={{
                input: { color: "#fff" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "white" },
                  "&:hover fieldset": { borderColor: "#64b5f6" },
                  "&.Mui-focused fieldset": { borderColor: "#64b5f6" },
                },
              }}
              InputProps={{ style: { color: "white" } }}
            />

            {/* Suggestion dropdown list */}
            {suggestions.length > 0 && (
              <Paper
                sx={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  right: 0,
                  zIndex: 100,
                  backgroundColor: "rgba(0, 0, 0, 0.7)",
                  color: "white",
                }}
              >
                <List>
                  {suggestions.map((movie) => (
                    <ListItem
                      button
                      key={movie.id}
                      onClick={() => handleSelect(movie)}
                    >
                      <ListItemText primary={movie.title} />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            )}
          </Box>

          {/* Conditional render: show account menu if logged in, else login button */}
          {loggedIn ? (
            <>
              <IconButton onClick={handleMenuClick} sx={{ color: "#64b5f6" }}>
                <AccountCircleIcon />
              </IconButton>
              <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
                <MenuItem
                  component={Link}
                  to="/favorites"
                  onClick={handleMenuClose}
                >
                  FAVORITES
                </MenuItem>
                {lastMovie && (
                  <MenuItem
                    onClick={() => {
                      navigate("/history");
                      handleMenuClose();
                    }}
                  >
                    SEARCH HISTORY
                  </MenuItem>
                )}
              </Menu>
            </>
          ) : (
            <Button
              component={Link}
              to="/login"
              sx={{
                color: "#64b5f6",
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                px: 2,
                py: 0.5,
                borderRadius: 1,
                "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.85)" },
              }}
              startIcon={<LoginIcon />}
            >
              LOGIN
            </Button>
          )}

          {/* Theme toggle button */}
          <ThemeToggle toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
