import { ColumnDef } from "../components/types/ColumnDef";
import { RowData } from "../components/types/RowData";
import { parseCSV } from "../utils/csvParser";
import { getColumnType, getErrorMessage } from "../utils/helpers";

export const fetchData = async (
    filePath: string,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setError: React.Dispatch<React.SetStateAction<string | null>>,
    setColumnDefs: React.Dispatch<React.SetStateAction<ColumnDef[]>>,
    setRowData: React.Dispatch<React.SetStateAction<RowData[]>>
  ) => {
    setLoading(true);
    try {
      const data = await parseCSV(filePath);
      if (data.length === 0) {
        setRowData([]); 
      } else {
        const columnDefs = Object.keys(data[0]).map(field => ({
          headerName: field,
          field: field,
          editable: true,
          sortable: true,
          resizable: true,
          type: getColumnType(data[0][field]),
        }));
        setColumnDefs(columnDefs);
        setRowData(data);
      }
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };
  