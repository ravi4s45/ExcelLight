import {useEffect, useState } from 'react';
import styles from '../CurrentCellFunction/MainTable.module.scss'

export function ExcelFunctionBar(){



  
    return(
      <>
        <div className={styles.CellFunctionContainer}>
         <div className={styles.CurrentCellName} ></div>
         <div className={styles.FxHeader}>fx</div>
         <input className={styles.CurrentCellInput} />
        </div>
        </>
        )
}