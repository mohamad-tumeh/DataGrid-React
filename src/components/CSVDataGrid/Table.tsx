import React, { useState, useEffect } from 'react';
import DataGrid from './DataGrid'; 
import LoadingState from './LoadingState';
import ErrorState from './ErrorState';
import { parseCSV } from '../../utils/csvParser';
import EmptyState from './EmptyState';


const Table: React.FC = () => {
  const [rowData, setRowData] = useState<any[]>([]);
  const [columnDefs, setColumnDefs] = useState<{
    headerName: string;
    field: string;
    editable: boolean;
    sortable: boolean;
    resizable: boolean;
    type: 'string' | 'number' | 'boolean';
  }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); 
      try {
        const data = await parseCSV('/supermarket_sales.csv');
        if (data.length === 0) {
          setError('No Data Available');
        } else {
          const cols = Object.keys(data[0]).map(field => ({
            headerName: field,
            field: field,
            editable: true,
            sortable: true,
            resizable: true,
            type: getColumnType(data[0][field]),
          }));
          setColumnDefs(cols);
          setRowData(data);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getColumnType = (value: any): 'string' | 'number' | 'boolean' => {
    if (value === true || value === false) return 'boolean';
    if (!isNaN(value) && value !== null && value !== '') return 'number';
    return 'string';
  };

  const handleColumnNameChange = (field: string, newHeaderName: string) => {
    setColumnDefs((prevDefs) => 
      prevDefs.map(col => (col.field === field ? { ...col, headerName: newHeaderName } : col))
    );
  };

  return (
    <div className="datagrid-container ag-theme-alpine" style={{ height: '100vh', width: '100%' }}>
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
    </div>
  );
};

export default Table;
