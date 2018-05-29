import React from 'react';
import '../styles/loading.css'

const LoadingScreen = props =>
    <div className={'loading-screen'}>
        <div className={'form-loader'}>
            <form onSubmit={(e) => props.loadInput(e)}>
                <label htmlFor={'sudoku-input'}>Enter your board here</label>
                <input id={'sudoku-input'} type="text" />
            </form>
            <h2 className={'or'}>...or</h2>
        </div>
        <div className={'ls-loader'}>
            <button onClick={() => props.loadLS()}>Load from Local Storage</button>
        </div>
    </div>

export default LoadingScreen;