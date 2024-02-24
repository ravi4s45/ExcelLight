export interface CellProperties {
    fontStyle?: string;
    color?: string;
    backgroundColor?: string;
    fontFamily?: string;
    alignment?: string;
  }
  export enum CellType {
   Text = "text",
   Number = "number",
   Boolean = "boolean",
   Date = "Date"
  }
  export interface Cell {
    row: number;
    column: string;
    value: string;
    type:CellType;
    properties?: CellProperties;
  }

  export interface CreateCellTablesProps {
    cellValue: string;
    onInputChange:(CurrentCellId: string, CurrentCellVal: string) => void;
  }
  