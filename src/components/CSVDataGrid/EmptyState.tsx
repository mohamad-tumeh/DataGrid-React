import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';

const EmptyState: React.FC = () => {
  return (
    <Box
      sx={{
        textAlign: 'center',
        padding: 3,
        backgroundColor: '#f9f9f9',
        borderRadius: 2,
        boxShadow: 2,
      }}
    >
      <SentimentDissatisfiedIcon fontSize="large" color="disabled" />
      <Typography variant="h4" gutterBottom sx={{ marginTop: 2 }}>
        No Data Available
      </Typography>
      <Typography variant="body1" sx={{ color: 'text.secondary', marginBottom: 3 }}>
        It seems there is no data to display. Please check back later or try a different filter.
      </Typography>
      <Button variant="contained" color="primary" onClick={() => window.location.reload()}>
        Refresh Page
      </Button>
    </Box>
  );
};

export default EmptyState;
