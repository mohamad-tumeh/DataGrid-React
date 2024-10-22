import { ColumnType } from "../components/types/ColumnType";

export const getColumnType = (value: any): ColumnType['type'] => {
    if (value instanceof Date) return 'date';
    if (value === true || value === false) return 'boolean';
    if (!isNaN(value) && value !== null && value !== '') return 'number';
    return 'string';
  };
  
  export const getErrorMessage = (err: unknown): string => {
    return err instanceof Error ? err.message : 'Error fetching data';
  };
  