import './App.css';
import { MenuBar } from './MenuBar/MenuBar';
import { MainTable } from './CurrentCellFunction/MainTable';
import { ExcelFunctionBar } from './ExcelFunctionBar/ExcelFunctionBar';
import { createContext, useEffect, useState } from 'react';
import "@glideapps/glide-data-grid/dist/index.css";
import './index.css'
import React from 'react';
import { createTableStructure } from './CellTables/createTableHelper';
import { Cell } from './CellTables/ICellProps';
import { CellActionBar } from './CellActionBar/CellActionBar';
import { DrawGrid } from './CanvasGrid/DrawGrid';

function App() {
const [activeCellId,SetActiveCellId] = useState('');
const [commonFuncCanvasCellVal,SetCommonFuncCanvasCellVal] = useState('');
const [isEditingFx,setIsEditingFx] = useState(false);
  return (
    <div>
     <MenuBar/>
     {/* <MainTable/> */}
     {/* <CreateCellTables/> */}
     <CellActionBar/>
     <ExcelFunctionBar ActiveCell = {activeCellId} CommonFuncCanvasCellVal={commonFuncCanvasCellVal} SetCommonFuncCanvasCellVal={SetCommonFuncCanvasCellVal} SetIsEditingFx={setIsEditingFx}/>
     {/* <ExcelTable/> */}
     {/* <DataEditor columns={columnsData} getCellContent={getContent} rows={cellData.length} onCellEdited={onCellEdit} width={1400} height={500}/> */}
     <DrawGrid SetActiveCell = {SetActiveCellId} CommonFuncCanvasCellVal={commonFuncCanvasCellVal} SetCommonFuncCanvasCellVal={SetCommonFuncCanvasCellVal} IsEditingFx={isEditingFx}/>
    </div>
  );
}

export default App;
