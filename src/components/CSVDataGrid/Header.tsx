import React, { useState, useCallback } from 'react';

interface HeaderProps {
  displayName: string;
  onChange: (newHeaderName: string) => void;
}

const Header: React.FC<HeaderProps> = ({ displayName, onChange }) => {
  const [editing, setEditing] = useState(false);
  const [headerName, setHeaderName] = useState(displayName);

  const handleBlur = useCallback(() => {
    onChange(headerName);
    setEditing(false);
  }, [headerName, onChange]);

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {editing ? (
        <input
          value={headerName}
          onChange={(e) => setHeaderName(e.target.value)}
          onBlur={handleBlur}
          onKeyPress={(e) => e.key === 'Enter' && handleBlur()}
          autoFocus
        />
      ) : (
        <div onClick={() => setEditing(true)} style={{ cursor: 'pointer' }}>
          {headerName}
        </div>
      )}
    </div>
  );
};

export default Header;
