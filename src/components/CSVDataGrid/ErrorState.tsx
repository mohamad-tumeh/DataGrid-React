import React from 'react';

interface ErrorStateProps {
  message: string;
}

const ErrorState: React.FC<ErrorStateProps> = ({ message }) => {
  return <div style={{ color: 'red' }}>Error: {message}</div>;
};

export default ErrorState;
