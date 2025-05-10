// src/components/Footer.jsx
import { Box, Typography, Stack, useTheme, Link } from "@mui/material";

// Footer component displays page footer with links and copyright
export default function Footer() {
  const theme = useTheme(); // Access current MUI theme to adapt to dark/light mode

  return (
    <Box
      sx={{
        bgcolor: theme.palette.mode === "dark" ? "#121212" : "#f0f0f0", // Background color based on theme
        color: theme.palette.text.primary, // Text color from theme
        py: 3, // Padding on Y axis
        mt: 5, // Margin top
        borderTop: `1px solid ${theme.palette.divider}`, // Top border for separation
      }}
    >
      {/* Navigation Links */}
      <Stack
        direction={{ xs: "column", sm: "row" }} // Vertical on small screens, horizontal on larger
        justifyContent="center"
        alignItems="center"
        spacing={{ xs: 1, sm: 4 }} // Responsive spacing
        textAlign="center"
      >
        {/* Individual footer links */}
        <Link href="#" underline="none" color="inherit" variant="body2">
          About Us
        </Link>
        <Link href="#" underline="none" color="inherit" variant="body2">
          Contact
        </Link>
        <Link href="#" underline="none" color="inherit" variant="body2">
          Disclaimer
        </Link>
      </Stack>

      {/* Copyright Notice */}
      <Typography
        variant="caption"
        sx={{ mt: 2, display: "block", textAlign: "center", opacity: 0.7 }}
      >
        &copy; {new Date().getFullYear()} Movie Explorer. All rights reserved.
      </Typography>
    </Box>
  );
}
