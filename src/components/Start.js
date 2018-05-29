import React from 'react';
import '../styles/start.css';
const Start = props => {
    return (
        <div className={'app'}>
            <h1 className={'sudoku-header'}>Sudoku</h1>
            <button onClick={props.start}>Start Game</button>
            <h2 className={'or'}>...or</h2>
            <button onClick={props.load}>Load Existing Game</button>
        </div>
    )
}
export default Start;