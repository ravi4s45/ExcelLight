import {useEffect, useState } from 'react';
import styles from '../CurrentCellFunction/MainTable.module.scss'
import { IExcelFunctionBarProps } from './IExcelFunctionBarProps';

export function ExcelFunctionBar(props:IExcelFunctionBarProps){

  const HandleFxInput = (e:React.ChangeEvent<HTMLInputElement>)=>{
    props.SetCommonFuncCanvasCellVal(e.target.value)
  }
    return(
      <>
        <div className={styles.CellFunctionContainer}>
         <div className={styles.CurrentCellName} >{props.ActiveCell}</div>
         <div className={styles.FxHeader}>fx</div>
         <input className={styles.CurrentCellInput} onChange={HandleFxInput} value={props.CommonFuncCanvasCellVal}/>
        </div>
        </>
        )
}