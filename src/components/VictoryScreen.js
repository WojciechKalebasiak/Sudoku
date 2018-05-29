import React from 'react';
import '../styles/victory.css'
const VictoryScreen = props => {
        return <div className={'victory-screen'}>
            <h1 className={'sudoku-header'}>Sudoku</h1>
            <h2 className={'victory-header'}>Congratulations! It tooks you <span>{props.time.minutes}:{props.time.seconds}</span> to solve it!</h2>
            <button onClick={props.home}>Home</button>
        </div>
}
export default VictoryScreen;