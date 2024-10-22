import React from 'react';
import Alert from '@mui/material/Alert';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  alert: {
    borderRadius: '8px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
  },
  icon: {
    fontSize: '40px',
  },
  button: {
    marginLeft: '16px',
    backgroundColor: '#ff9800',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#f57c00',
    },
  },
});

interface ErrorStateProps {
  message: string;
}

const ErrorState: React.FC<ErrorStateProps> = ({ message }) => {
  const classes = useStyles();

  const handleRefresh = () => {
    window.location.reload(); // إعادة تحميل الصفحة
  };

  return (
    <Box sx={{ width: '100%', mt: 2 }}>
      <Alert
        severity="error"
        className={classes.alert}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <SentimentDissatisfiedIcon className={classes.icon} /> 
          <Typography variant="body1" sx={{ ml: 1, flexGrow: 1 }}>
            Error: {message}
          </Typography>
          <Button 
            className={classes.button}
            onClick={handleRefresh} 
            variant="contained"
          >
            Refresh
          </Button>
        </Box>
      </Alert>
    </Box>
  );
};

export default ErrorState;
