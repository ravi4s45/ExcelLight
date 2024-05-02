import { useEffect, useRef, useState } from "react";
import { Cell, CreateCellTablesProps } from "./ICellProps";
import { debounce } from "lodash";
import styles from './Table.module.scss'
import { createTableStructure } from "./createTableHelper";
export function CreateCellTables(props:CreateCellTablesProps){
  createTableStructure();
  const tableLocalDataJSON = localStorage.getItem('matrixDataForPrimeUser');
    const matrix:Cell[][] = JSON.parse(tableLocalDataJSON?tableLocalDataJSON:'');
    const [tableData,setTableData] = useState(matrix)

    const handleCellInputChange = (event:any,rowIndex: number, columnIndex: number): any => {
       console.log(rowIndex, columnIndex);
       setActiveCell(columnIndex + '-' + rowIndex)
       props.onInputChange(numberToAlphabet(columnIndex)+'-'+(rowIndex+1),event.target.textContent);
    }
    const [headerWidth, setHeaderWidth] = useState(100);
    const [headerHeight, setHeaderHeight] = useState(30);
    const [headerId,setHeaderId] = useState('1');
    const [activeCell,setActiveCell] = useState('A-1');
    const headerWidthRefs = useRef<Array<HTMLDivElement | null>>([])
    const headerHeightRefs = useRef<Array<HTMLDivElement | null>>([])
    useEffect(() => {
      // headerHeightRefs.current = headerHeightRefs.current.slice(0, tableData.length);
      // headerWidthRefs.current = headerWidthRefs.current.slice(0, tableData[0].length);
      let currId = (props.cellValue.split('|'))[0];
      let cellVal = (props.cellValue.split('|'))[1];
      if(currId == "")
      return;

      let colNum = convertAlphabetToNumber(currId.split('-')[0])-1;
      let rowNum = parseInt(currId.split('-')[1]);
      // currEle.textContent = props.cellValue.split('-')[1];
      if(rowNum >= 0 && colNum >= 0 )
      {
       updateCellValue(rowNum-1,colNum,cellVal)
      }

   }, [props.cellValue]);

   const updateCellValue = (rowIndex: number, colIndex: number, newValue: string) => {
    const updatedTableData:Cell[][] = tableData.map((row, i) =>
      i === rowIndex
        ? row.map((cell, j) =>
            j === colIndex ? { ...cell, value: newValue } : cell
          )
        : row
    );
    setTableData(updatedTableData);
  };
    // const handleWidthResize = (event:any) => {
    //   const startX = event.clientX;
    //   const startY = event.clientY;
    //   const uniqueId = convertAlphabetToNumber(event.currentTarget.id);
    //   const handleResizeMouseMove = (event:any) => {
    //     const newWidth = headerWidth + event.clientX - startX;
    //     if(headerWidthRefs.current[uniqueId-1]!=null){
    //       headerWidthRefs.current[uniqueId-1]?.style.setProperty('width', `${newWidth}px`);
    //     }
    //     //setHeaderWidth(newWidth);
    //     setHeaderId(uniqueId.toString());
    //   };

    //   const handleResizeMouseUp = () => {
    //     document.removeEventListener('mousemove', handleResizeMouseMove);
    //     document.removeEventListener('mouseup', handleResizeMouseUp);
    //   };

    //   document.addEventListener('mousemove', handleResizeMouseMove);
    //   document.addEventListener('mouseup', handleResizeMouseUp);
    // };
    // const handleHeightResize = (event:any) => {
    //   const startY = event.clientY;
    //   const uniqueId:string = event.currentTarget.id?event.currentTarget.id:'0';

    //   const handleHeightResizeMouseMove = (event:any) => {
    //     const newHeight = headerHeight + event.clientY - startY;
    //     if(headerHeightRefs.current[parseInt(uniqueId)-1]!=null){
    //       headerHeightRefs.current[parseInt(uniqueId)-1]?.style.setProperty('height', `${newHeight}px`);
    //     }
    //     //setHeaderHeight(newHeight);
    //     setHeaderId(uniqueId);
    //   };

    //   const handleResizeMouseUp = () => {
    //     document.removeEventListener('mousemove', handleHeightResizeMouseMove);
    //     document.removeEventListener('mouseup', handleResizeMouseUp);
    //   };

    //   document.addEventListener('mousemove', handleHeightResizeMouseMove);
    //   document.addEventListener('mouseup', handleResizeMouseUp);
    // };
    function convertAlphabetToNumber(alphabet:string) {
      let result = 0;
      const len = alphabet.length;

      for (let i = 0; i < len; i++) {
        const char = alphabet[i];
        result = result * 26 + (char.charCodeAt(0) - 'A'.charCodeAt(0) + 1);
      }

      return result;
    }

    function numberToAlphabet(number:number) {
      let result = '';

      while (number >= 0) {
        result = String.fromCharCode(65 + (number % 26)) + result;
        number = Math.floor(number / 26) - 1;
      }

      return result;
    }

  // function ShowCurrentCell(event: any): void {
  //   props.onInputChange(event.currentTarget.id,event.currentTarget.textContent);
  // }

  const ShowCurrentCell = debounce((event) => {
    props.onInputChange(event.target.id,event.target.textContent);
  }, 300);
  // function TypeOnFx(event: FormEvent<HTMLDivElement>): void {
  //   throw new Error("Function not implemented.");
  // }

        return (
          // <table className={styles.tableContainer}>
          //   <thead>
          //       <tr>
          //       <th className={styles.tableHeader} ></th>
          //           {
          //            tableData[0].map((cellItem,cellIndex) =>
          //            <th className={styles.tableHeader} id={cellItem.column} ref={(el) => (headerWidthRefs.current[cellIndex] = el)} key={cellItem.column} style={{ width: `${headerWidth}px`}}
          //                onMouseDown={handleWidthResize}>{cellItem.column}
          //            </th>
          //            )
          //           }
          //       </tr>
          //   </thead>
          //   <tbody>
          //     {tableData.map((row, rowIndex) => (
          //       <tr key={rowIndex}>
          //           <th className={styles.tableHeaderNum} ref={(el) => (headerHeightRefs.current[rowIndex] = el)} style={{ height: `${headerHeight}px`}} id={(rowIndex+1).toString()} key={rowIndex+1}  onMouseDown={handleHeightResize} >{rowIndex+1}</th>
          //         {row.map((cellValue, columnIndex) => (
          //           <td key={columnIndex+''+ rowIndex}
          //               className={styles.tableData}
          //               contentEditable={true}
          //               onInput={(event) => handleCellInputChange(event, rowIndex, columnIndex)}
          //             >{cellValue.value}
          //           </td>
          //         ))}
          //       </tr>
          //     ))}
          //   </tbody>
          // </table>
          <>
          <div className={styles.MainGrid}>
            <div className={styles.NumColumnTable}>
              <div className={styles.tableHeaderNum} style={{height:'21px', backgroundColor:'#d1d1d1'}}></div>
              {
               tableData.map((row,rowIndex) =>
                <div className={styles.tableHeaderNum} id={(rowIndex+1).toString()}  key={rowIndex}>{rowIndex+1}</div>
               )
               }
            </div>
            <div className={styles.MainTable}>
              <div className={styles.HeaderRow}>
                         {
                   tableData[0].map((cellItem,cellIndex) =>
                  <div className={styles.tableHeader} id={cellItem.column} ref={(el) => (headerWidthRefs.current[cellIndex] = el)} key={cellItem.column}
                     >{cellItem.column}
                  </div>
                 )
                   }
              </div>
              <div className={styles.CellTable}>
              {tableData.map((row, rowIndex) => (
                <div className={styles.HeaderRow}>
                  {
                row.map((cellValue, columnIndex) => (
                  <div key={numberToAlphabet(columnIndex) + '-' + (rowIndex+1)}
                       id={numberToAlphabet(columnIndex) + '-' + (rowIndex+1)}
                       onInput={ShowCurrentCell}
                       /*onFocus={ShowCurrentCell}*/
                      className={styles.tableHeader}
                      contentEditable={true}
                     >{cellValue.value}
                   </div>
                  ))
                }
                </div>
              ))}
              </div>
            </div>

          </div>
          <div className={styles.footer}></div>
          </>
        );

}

