import React, { useState, useEffect } from 'react';
import DataGrid from './DataGridComponent';
import LoadingState from './LoadingState';
import ErrorState from './ErrorState';
import EmptyState from './EmptyState';
import { RowData } from '../types/RowData';
import { ColumnDef } from '../types/ColumnDef';
import { Container } from '@mui/material';
import { fetchData } from '../../api/api';

const Table: React.FC = () => {
  const [rowData, setRowData] = useState<RowData[]>([]);
  const [columnDefs, setColumnDefs] = useState<ColumnDef[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const filePath = '/supermarket_sales.csv'; 
    fetchData(filePath, setLoading, setError, setColumnDefs, setRowData);
  }, []);

  const handleColumnNameChange = (field: string, newHeaderName: string) => {
    setColumnDefs(prevDefs =>
      prevDefs.map(col => (col.field === field ? { ...col, headerName: newHeaderName } : col))
    );
  };

  return (
    <Container sx={{ height: '80vh' }}>
      {loading ? (
        <LoadingState />
      ) : error ? (
        <ErrorState message={error} />
      ) : rowData.length === 0 ? (
        <EmptyState />
      ) : (
        <DataGrid
          rowData={rowData}
          columnDefs={columnDefs}
          onColumnNameChange={handleColumnNameChange}
        />
      )}
    </Container>
  );
};

export default Table;
