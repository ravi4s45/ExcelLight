import { useEffect, useState } from 'react';
import styles from './MainTable.module.scss'
import { CreateCellTables } from '../CellTables/createTable';
import { createTableStructure } from '../CellTables/createTableHelper';
export function MainTable(){
  useEffect(() =>{
    createTableStructure();
  }, [])
    const [CellId,setCellId] = useState('A1')
    const [CellValue,setCellValue] = useState('')
    const [ReverseCellValue,setReverseCellValue] = useState('');
    function currentCellChange(CurrentCellId:string,CurrentCellVal:string){
        setCellId(CurrentCellId);
        setCellValue(CurrentCellVal);
      };
      const handleInputChange = (event:any) => {
        setReverseCellValue(CellId+'|'+event.target.value);
        setCellValue(event.target.value);
      };
    return(
      <>
        <div className={styles.CellFunctionContainer}>
         <div className={styles.CurrentCellName} >{CellId}</div>
         <div className={styles.FxHeader}>fx</div>
         <input className={styles.CurrentCellInput} value={CellValue} onChange={handleInputChange}/>
        </div>
        {/* <Table onInputChange = {currentCellChange} cellValue = {CellValue}/> */}
        <CreateCellTables onInputChange={currentCellChange} cellValue = {ReverseCellValue}/>

        </>
        )
}