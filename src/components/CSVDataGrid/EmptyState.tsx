import React from 'react';

const EmptyState: React.FC = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '20%' }}>
      <h2>No Data Available</h2>
      <p>Please check back later or adjust your filters.</p>
    </div>
  );
};

export default EmptyState;
