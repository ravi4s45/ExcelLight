import { Cell, CellType } from "./ICellProps";

export function createTableStructure(){
    const numRows = 100; // Number of rows in the matrix
    const numColumns = 26; // Number of columns in the matrix

// Create an empty matrix
const matrix: Cell[][] = [];

// Initialize the matrix with empty cells
for (let row = 0; row < numRows; row++) {
  matrix[row] = [];
  for (let col = 0; col < numColumns; col++) {
    matrix[row][col] = {
      row: row + 1,
      column: String.fromCharCode(65 + col), // Convert column index to corresponding letter (A, B, C, ...)
      value: `${String.fromCharCode(65+col)}-${row+1}`,
      type:CellType.Text,
      properties: {}
    };
  }  
}
 //Set the matrix to the local storage
 const matrixJSON = JSON.stringify(matrix);
// Save matrix in local storage
localStorage.setItem('matrixDataForPrimeUser', matrixJSON);
}