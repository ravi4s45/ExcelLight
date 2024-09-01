import './App.css';
import { MenuBar } from './MenuBar/MenuBar';
import { MainTable } from './CurrentCellFunction/MainTable';
import { ExcelFunctionBar } from './ExcelFunctionBar/ExcelFunctionBar';
import { createContext, useEffect, useState } from 'react';
import './index.css'
import React from 'react';
import { createTableStructure } from './CellTables/createTableHelper';
import { Cell } from './CellTables/ICellProps';
import { CellActionBar } from './CellActionBar/CellActionBar';
import { DrawGrid } from './CanvasGrid/DrawGrid';
import ExcelFooter from './ExcelFooter/ExcelFooter'
import { Sheet } from './CanvasSheet/Sheet';

const initialData:any = [];
for (let row = 0; row < 1; row++) {
  const rowData = [];
  for (let col = 0; col < 1; col++) {
    rowData.push(`${col + 1}`);
  }
  initialData.push(rowData);
}

function App() {
const [activeCellId,SetActiveCellId] = useState('');
const [commonFuncCanvasCellVal,SetCommonFuncCanvasCellVal] = useState('');
const [isEditingFx,setIsEditingFx] = useState(false);
const [displayData, setDisplayData] = useState(initialData);

  const onChange = (changes:any) => {
    const newData = [...displayData];

    for (let change of changes) { // { x, y, value }
      if (!newData[change.y]) {
        newData[change.y] = [];
      }
      newData[change.y][change.x] = change.value;
    }

    setDisplayData(newData);
  }

  return (
    <div>
     <MenuBar/>
     <CellActionBar/>
     <ExcelFunctionBar ActiveCell = {activeCellId} CommonFuncCanvasCellVal={commonFuncCanvasCellVal} SetCommonFuncCanvasCellVal={SetCommonFuncCanvasCellVal} SetIsEditingFx={setIsEditingFx}/>
     <Sheet displayData={displayData} onChange={onChange} SetActiveCell = {SetActiveCellId} CommonFuncCanvasCellVal={commonFuncCanvasCellVal} SetCommonFuncCanvasCellVal={SetCommonFuncCanvasCellVal}/>
     {/* <DrawGrid SetActiveCell = {SetActiveCellId} CommonFuncCanvasCellVal={commonFuncCanvasCellVal} SetCommonFuncCanvasCellVal={SetCommonFuncCanvasCellVal} IsEditingFx={isEditingFx}/> */}
     <ExcelFooter/>
    </div>
  );
}

export default App;
