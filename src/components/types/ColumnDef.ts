import { ColumnType } from "./ColumnType";

export interface ColumnDef {
    headerName: string;
    field: string;
    editable: boolean;
    sortable: boolean;
    resizable: boolean;
    type: ColumnType['type'];
  }
  