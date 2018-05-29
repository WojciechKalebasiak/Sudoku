import React from 'react';
import '../styles/sudokucode.css'
const SudokuCode = props =>
    <div className={'sudoku-code'}>
        <h1>Save it in safe place!</h1>
        <h2 className={'code'}>{props.code}</h2>
    </div>
export default SudokuCode;