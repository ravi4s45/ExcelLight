import './App.css';
import { MenuBar } from './MenuBar/MenuBar';
import { MainTable } from './CurrentCellFunction/MainTable';
import { ExcelFunctionBar } from './ExcelFunctionBar/ExcelFunctionBar';
import { createContext, useEffect, useState } from 'react';
import "@glideapps/glide-data-grid/dist/index.css";
import './index.css'
import {
  DataEditor,
  EditableGridCell,
  GridCell,
  GridCellKind,
  GridColumn,
  Item
} from "@glideapps/glide-data-grid";
import React from 'react';
import { createTableStructure } from './CellTables/createTableHelper';
import { Cell } from './CellTables/ICellProps';
import { CellActionBar } from './CellActionBar/CellActionBar';
import { DrawGrid } from './CanvasGrid/DrawGrid';




function generateColumns(numColumns:number) {
  const columns = [];

  for (let i = 0; i < numColumns; i++) {
    const columnName = String.fromCharCode(65 + i); // A: 65, B: 66, ..., Z: 90
    const column = { title: columnName,id:columnName,width:100};
    columns.push(column);
  }

  return columns;
}

function convertNestedArray(input:Cell[][]) {
  const result = input.map(row => {
    const obj:any = {};
    row.forEach(item => {
      const columnName = item.column;
      const value = "";//item.value;
      obj[columnName] = value;
    });
    return obj;
  });

  return result;
}
createTableStructure();
const tableLocalDataJSON = localStorage.getItem('matrixDataForPrimeUser');
const matrix:Cell[][] = JSON.parse(tableLocalDataJSON?tableLocalDataJSON:'');
const data:any= convertNestedArray(matrix);
const columnData:GridColumn[] = generateColumns(26);
let cellData:any=data;
let columnsData:GridColumn[] = columnData;
function App() {
 
  useEffect(()=>{
    cellData = data;
    columnsData = columnData;
    console.log(data);
    console.log(columnData);
    
  },[])
  const a = new Array(1).fill(new Array(1).fill(0))
  // const [cellData,setCellData] = useState<any>([]);
  // const [columnsData,setColumnsData] = useState<GridColumn[]>([]);
  const getContent = React.useCallback((cell: Item): GridCell => {
    const [col, row] = cell;
    const dataRow:any = cellData[row];
    // dumb but simple way to do this
    const indexes: (keyof any)[] = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    const d = dataRow[indexes[col]]
    return {
      kind: GridCellKind.Text,
      allowOverlay: true,
      readonly: false,
      displayData: d,
      data: d,
    };
  }, []);

  const onCellEdit = React.useCallback((cell: Item, newValue: EditableGridCell) => {
    if (newValue.kind !== GridCellKind.Text) {
        // we only have text cells, might as well just die here.
        return;
    }

    const indexes: (keyof any)[] = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    const [col, row] = cell;
    const key = indexes[col];
    cellData[row][key] = newValue.data;
}, []);
  return (
    <div>
     <MenuBar/>
     {/* <MainTable/> */}
     {/* <CreateCellTables/> */}
     <CellActionBar/>
     <ExcelFunctionBar/>
     {/* <ExcelTable/> */}
     {/* <DataEditor columns={columnsData} getCellContent={getContent} rows={cellData.length} onCellEdited={onCellEdit} width={1400} height={500}/> */}
     <DrawGrid/>
    </div>
  );
}

export default App;
