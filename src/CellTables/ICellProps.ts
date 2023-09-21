export interface CellProperties {
    fontStyle?: string;
    color?: string;
    backgroundColor?: string;
    fontFamily?: string;
    alignment?: string;
  }
  
  export interface Cell {
    row: number;
    column: string;
    value: string;
    properties?: CellProperties;
  }

  export interface CreateCellTablesProps {
    cellValue: string;
    onInputChange:(CurrentCellId: string, CurrentCellVal: string) => void;
  }
  