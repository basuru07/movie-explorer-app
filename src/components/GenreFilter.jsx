import { Box, Button, IconButton } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

// GenreFilter Component: Renders a list of genres as selectable buttons with a forward icon
export default function GenreFilter({ genres, selected, onSelect }) {
  return (
    <Box
      sx={{
        display: 'flex',             // Flex layout for horizontal arrangement
        justifyContent: 'center',   // Center the items horizontally
        flexWrap: 'wrap',           // Wrap buttons to next line if needed
        gap: 1.5,                   // Space between items
        mb: 4,                      // Margin bottom for spacing below section
      }}
    >
      {/* Render a button for each genre */}
      {genres.map((genre) => (
        <Button
          key={genre}                         // Unique key for each genre
          onClick={() => onSelect(genre)}     // Call the selection handler
          variant={genre === selected ? 'contained' : 'outlined'} // Highlight if selected
          color="primary"
          size="small"
          sx={{
            borderRadius: '8px',              // Rounded corners
            px: 2.5,                          // Horizontal padding
            fontWeight: 'bold',
            textTransform: 'none',            // Keep original casing
            backgroundColor: genre === selected ? '#87CEFA' : 'transparent', // Selected background
            color: genre === selected ? '#000' : '#87CEFA',                   // Text color
            borderColor: '#87CEFA',           // Border color for outlined buttons
            '&:hover': {
              backgroundColor:
                genre === selected ? '#76bfe7' : 'transparent', // Hover background
              borderColor: '#76bfe7',                           // Hover border
              color: genre === selected ? '#000' : '#76bfe7',   // Hover text color
            },
          }}
        >
          {genre}
        </Button>
      ))}

      {/* Optional icon button (e.g., for scrolling or pagination) */}
      <IconButton>
        <ArrowForwardIosIcon sx={{ fontSize: 16, color: '#87CEFA' }} />
      </IconButton>
    </Box>
  );
}
