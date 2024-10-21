import React, { useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import Header from './Header';

interface ColumnDef {
  field: string;
  headerName: string;
  type: 'string' | 'number' | 'boolean';
  editable: boolean;
}

interface DataGridProps {
  rowData: any[];
  columnDefs: ColumnDef[];
  onColumnNameChange: (field: string, newHeaderName: string) => void;
}

const DataGrid: React.FC<DataGridProps> = ({ rowData, columnDefs, onColumnNameChange }) => {
  
  const getColumnDefsWithTypes = useMemo(() => {
    return columnDefs.map(col => ({
      ...col,
      headerName: `${col.headerName} (${col.type})`,
      cellEditor: 'agTextCellEditor',
      headerComponentFramework: Header,
      headerComponentParams: {
        onChange: (newHeader: string) => onColumnNameChange(col.field, newHeader),
      },
    }));
  }, [columnDefs, onColumnNameChange]);

  return (
    <div className="ag-theme-alpine" style={{ height: '100vh', width: '100%' }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={getColumnDefsWithTypes}
        pagination={true}
        paginationPageSize={10}
        domLayout="autoHeight"
        rowBuffer={0}
  
      />
    </div>
  );
};

export default DataGrid;
