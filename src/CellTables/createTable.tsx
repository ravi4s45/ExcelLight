import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Cell, CreateCellTablesProps } from "./ICellProps";
import styles from './Table.module.scss'
export function CreateCellTables(props:CreateCellTablesProps){
 const tableLocalDataJSON = localStorage.getItem('matrixDataForPrimeUser');
    const matrix:Cell[][] = JSON.parse(tableLocalDataJSON?tableLocalDataJSON:'');
    const [tableData,setTableData] = useState(matrix)
    
    const handleCellInputChange = (event:any,rowIndex: number, columnIndex: number): any => {
       console.log(rowIndex, columnIndex);
       setActiveCell(columnIndex + '-' + rowIndex)
       props.onInputChange(numberToAlphabet(columnIndex)+'-'+(rowIndex+1),event.target.textContent  );
    }
    const [headerWidth, setHeaderWidth] = useState(100);
    const [headerHeight, setHeaderHeight] = useState(30);
    const [headerId,setHeaderId] = useState('1');
    const [activeCell,setActiveCell] = useState('A-1');
    const headerWidthRefs = useRef<Array<HTMLDivElement | null>>([])
    const headerHeightRefs = useRef<Array<HTMLDivElement | null>>([])
    useEffect(() => {
      headerHeightRefs.current = headerHeightRefs.current.slice(0, tableData.length);
      headerWidthRefs.current = headerWidthRefs.current.slice(0, tableData[0].length);
   }, [tableData.length,tableData[0].length]);
    const handleWidthResize = (event:any) => {
      const startX = event.clientX;
      const startY = event.clientY;
      const uniqueId = convertAlphabetToNumber(event.currentTarget.id);
      const handleResizeMouseMove = (event:any) => {
        const newWidth = headerWidth + event.clientX - startX;
        if(headerWidthRefs.current[uniqueId-1]!=null){
          headerWidthRefs.current[uniqueId-1]?.style.setProperty('width', `${newWidth}px`);
        }
        //setHeaderWidth(newWidth);
        setHeaderId(uniqueId.toString());
      };
  
      const handleResizeMouseUp = () => {
        document.removeEventListener('mousemove', handleResizeMouseMove);
        document.removeEventListener('mouseup', handleResizeMouseUp);
      };
  
      document.addEventListener('mousemove', handleResizeMouseMove);
      document.addEventListener('mouseup', handleResizeMouseUp);
    };
    const handleHeightResize = (event:any) => {
      const startY = event.clientY;
      const uniqueId:string = event.currentTarget.id?event.currentTarget.id:'0';
      
      const handleHeightResizeMouseMove = (event:any) => {
        const newHeight = headerHeight + event.clientY - startY;
        if(headerHeightRefs.current[parseInt(uniqueId)-1]!=null){
          headerHeightRefs.current[parseInt(uniqueId)-1]?.style.setProperty('height', `${newHeight}px`);
        }
        //setHeaderHeight(newHeight);
        setHeaderId(uniqueId);
      };
  
      const handleResizeMouseUp = () => {
        document.removeEventListener('mousemove', handleHeightResizeMouseMove);
        document.removeEventListener('mouseup', handleResizeMouseUp);
      };
  
      document.addEventListener('mousemove', handleHeightResizeMouseMove);
      document.addEventListener('mouseup', handleResizeMouseUp);
    };
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
    
        return (
          <table className={styles.tableContainer}>
            <thead>
                <tr>
                <th className={styles.tableHeader} ></th>
                    {
                     tableData[0].map((cellItem,cellIndex) =>
                     <th className={styles.tableHeader} id={cellItem.column} ref={(el) => (headerWidthRefs.current[cellIndex] = el)} key={cellItem.column} style={{ width: `${headerWidth}px`}} 
                         onMouseDown={handleWidthResize}>{cellItem.column}
                     </th>
                     )
                    }
                </tr>
            </thead>
            <tbody>
              {tableData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                    <th className={styles.tableHeaderNum} ref={(el) => (headerHeightRefs.current[rowIndex] = el)} style={{ height: `${headerHeight}px`}} id={(rowIndex+1).toString()} key={rowIndex+1}  onMouseDown={handleHeightResize} >{rowIndex+1}</th>
                  {row.map((cellValue, columnIndex) => (
                    <td key={columnIndex+''+ rowIndex}
                        className={styles.tableData}
                        contentEditable={true}
                        onInput={(event) => handleCellInputChange(event, rowIndex, columnIndex)}
                      >{cellValue.value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        );
    
}

