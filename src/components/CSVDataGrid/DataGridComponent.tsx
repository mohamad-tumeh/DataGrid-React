import React, { useMemo, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Box, Paper, IconButton, Typography, Button, MenuItem, Select, FormControl, InputLabel, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { RowData } from '../types/RowData';
import { SelectChangeEvent } from '@mui/material/Select';
import { ColumnDef } from '../types/ColumnDef';

interface DataGridProps {
  rowData: RowData[];
  columnDefs: ColumnDef[];
  onColumnNameChange: (field: string, newHeaderName: string) => void;
}

const DataGrid: React.FC<DataGridProps> = ({ rowData, columnDefs, onColumnNameChange }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [editableHeader, setEditableHeader] = useState<{ field: string; value: string } | null>(null);
  const totalPages = Math.ceil(rowData.length / pageSize);
  
  const displayedRowData = useMemo(() => {
    const start = currentPage * pageSize;
    return rowData.slice(start, start + pageSize);
  }, [rowData, currentPage, pageSize]);

  const getColumnDefsWithTypes = useMemo(() => {
    return columnDefs.map(col => ({
      ...col,
      sortable: !editableHeader,
      cellEditor: 'agTextCellEditor',
      cellStyle: { 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        borderBottom: '1px solid #ccc',
      }, 
      headerComponent: (params: any) => {
        const sortOrder = params.column.getSort();
        const toggleSort = () => {
          if (!editableHeader) {
            const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
            params.column.setSort(newSortOrder);
            params.api.onSortChanged();
          }
        };

        return (
          <Box display="flex" alignItems="center" justifyContent="center" sx={{ cursor: 'pointer', padding: 1 }} onClick={toggleSort}>
            {editableHeader && editableHeader.field === col.field ? (
              <TextField
                value={editableHeader.value}
                onChange={(event) => setEditableHeader({ field: col.field, value: event.target.value })}
                onBlur={() => {
                  onColumnNameChange(col.field, editableHeader.value);
                  setEditableHeader(null);
                }}
                size="small"
                autoFocus
              />
            ) : (
              <>
                <Typography variant="h6" sx={{ marginRight: 1 }}>
                  {col.headerName}
                  {sortOrder ? (sortOrder === 'asc' ? ' ▲' : ' ▼') : ''}
                </Typography>
                <IconButton size="small" onClick={(event) => {
                  event.stopPropagation();
                  setEditableHeader({ field: col.field, value: col.headerName });
                }}>
                  <EditIcon fontSize="small" />
                </IconButton>
              </>
            )}
          </Box>
        );
      },
      headerClass: 'custom-header',
    }));
  }, [columnDefs, onColumnNameChange, editableHeader]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handlePageSizeChange = (event: SelectChangeEvent<number>) => {
    setPageSize(Number(event.target.value));
    setCurrentPage(0);
  };

  const getRowStyle = (params: any) => {
    return {
      backgroundColor: '#fff',
      transition: 'background-color 0.3s'
    };
  };

  return (
    <Box sx={{ height: '80vh', width: '100%', display: 'flex', flexDirection: 'column' }}>
      <Paper elevation={3} sx={{ borderRadius: 2, flex: 1 }}>
        <Box sx={{ padding: 2 }}>
          <AgGridReact
            rowData={displayedRowData}
            columnDefs={getColumnDefsWithTypes}
            pagination={false}
            rowBuffer={0}
            domLayout="autoHeight"
            headerHeight={50}
            rowHeight={50}
            getRowStyle={getRowStyle}
            rowClassRules={{
              'hover-row': 'true',
            }}
          />
        </Box>
      </Paper>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 2, position: 'fixed', bottom: 0, left: 0, right: 0, backgroundColor: 'white' }}>
        <FormControl variant="outlined" size="small">
          <InputLabel id="page-size-label">Items per page</InputLabel>
          <Select
            labelId="page-size-label"
            value={pageSize}
            onChange={handlePageSizeChange}
            label="Items per page"
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={50}>50</MenuItem>
            <MenuItem value={100}>100</MenuItem>
          </Select>
        </FormControl>
        <Box sx={{ marginLeft: 3 }}>
          <Button variant="outlined" disabled={currentPage === 0} onClick={() => handlePageChange(currentPage - 1)}>
            Previous
          </Button>
          <Typography variant="body1" sx={{ display: 'inline-block', mx: 2 }}>
            Page {currentPage + 1} of {totalPages}
          </Typography>
          <Button variant="outlined" disabled={currentPage >= totalPages - 1} onClick={() => handlePageChange(currentPage + 1)}>
            Next
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default DataGrid;
