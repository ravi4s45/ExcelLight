import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { MenuBar } from './MenuBar/MenuBar';
import { MainTable } from './CurrentCellFunction/MainTable';
import { createTableStructure } from './CellTables/createTableHelper';
import { CreateCellTables } from './CellTables/createTable';
function App() {

  return (
    <div>
     <MenuBar/>
     <MainTable/>
     {/* <CreateCellTables/> */}
    </div>
  );
}

export default App;
