import React from 'react';
import './App.css';
import Table from './components/CSVDataGrid/Table';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Interactive Data Grid</h1>
      <Table  />
    </div>
  );
};

export default App;
