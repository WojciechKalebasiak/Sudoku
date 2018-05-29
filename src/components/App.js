import React, { Component } from 'react';
import Start from './Start';
import Sudoku from './Sudoku';
import GameSettings from './GameSettings';
import VictoryScreen from './VictoryScreen';
import LoadingScreen from './LoadingScreen';
import InputError from './InputError'
import SudokuCode from './SudokuCode'
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            appState: 'start',
        }
    }
    //Setting game state and finishing counting time
    handleSolve = (solved) => {
        const temp = new Date();
        if (solved === true) {
            this.setState({
                solved,
                appState: 'victory',
                finishTime: temp.getTime()
            });
        }
        else
            this.setState({ solved });
    }
    //Loading sudoku board from localStorage and spliting in to array
    loadFromLocalStorage = () => {
        const loadedSudoku = localStorage.getItem('sudoku').split('');
        this.startTimer();
        this.setState({ customBoard: loadedSudoku, appState: 'game' })
    }
    //Setting particular game states
    getCode = (sudokuCode) => {
        this.setState({ appState: 'getSudokuCode', sudokuCode });
    }
    startApp = () => {
        this.setState({ appState: 'start' });
    }
    startGame = () => {
        this.setState({ appState: 'settingLevel' });
    }
    loadGame = () => {
        this.setState({ appState: 'loadingGame' })
    }
    backToGame = () => {
        this.setState({ appState: 'game' });
    }
    startTimer = () => {
        const temp = new Date();
        this.setState({ startTime: temp.getTime() });
    }
    setLevel = (sudokuLevel) => {
        this.startTimer();
        this.setState(
            {
                level: sudokuLevel,
                appState: 'game'
            }
        );
    }
    //Function count diffrence between two times(using for counting between startTime and finishTime) 
    //and returns time in nice form
    countDateDiff = (startTime, finishTime) => {
        let minutes;
        let seconds;
        const dateDiff = Math.floor((finishTime - startTime) / 1000);
        dateDiff / 60 < 10 ? minutes = '0' + Math.floor(dateDiff / 60).toString() : minutes = Math.floor(dateDiff / 60).toString()
        dateDiff % 60 < 10 ? seconds = '0' + Math.floor(dateDiff % 60).toString() : seconds = Math.floor(dateDiff % 60).toString()
        const time = {
            minutes,
            seconds
        }
        return time;
    }
    //validate input board
    // if one of elements is array isn't dot or number it returns false, otherwise it returns true
    validateInputBoard = (e) => {
        e.preventDefault();
        const customBoard = e.target.lastChild.value.split('');
        if (customBoard.length !== 81)
            return false;
        customBoard.forEach(element => {
            if (!(/\d+$/.test(element) || element == '.'))
                return false;
        });
        return true;

    }
    //checks if input board is valid
    //then set it as custom board and start timer
    handleInputBoard = (e) => {
        if (this.validateInputBoard(e)) {
            this.startTimer();
            const customBoard = e.target.lastChild.value.split('');
            this.setState({ appState: 'game', customBoard });
        }
        else {
            this.setState({ appState: 'inputerror' });
        }
    }
    //Render components
    renderSudokuCode = () => {
        return <SudokuCode code={this.state.sudokuCode} />
    }
    renderError = () => {
        return <InputError restartLoading={this.loadGame} home={this.startApp} />
    }
    renderLoading = () => {
        return <LoadingScreen loadInput={this.handleInputBoard} loadLS={this.loadFromLocalStorage} />
    }
    renderStart = () => {
        return <Start start={this.startGame} load={this.loadGame}/>
    }
    renderVictory = () => {
        return <VictoryScreen time={this.countDateDiff(this.state.startTime, this.state.finishTime)} home={this.startApp} />;
    }
    renderLevelSetting = () => {
        return <GameSettings setLevel={this.setLevel} />;
    }
    renderGame = () => {
        return <Sudoku level={this.state.level} solve={this.handleSolve} getCode={this.getCode} customBoard={this.state.customBoard} done={this.state.solved} changeLevel={this.startGame} />
    }
    //render by state.appState switch case
    //state.appState is set after each specific operation which reflects current stage in app
    render = () => {
        switch (this.state.appState) {
            case 'start':
                return this.renderStart();
                break;
            case 'settingLevel':
                return this.renderLevelSetting();
                break;
            case 'game':
                return this.renderGame();
                break;
            case 'victory':
                return this.renderVictory();
                break;
            case 'loadingGame':
                return this.renderLoading();
                break;
            case 'inputerror':
                return this.renderError();
                break;
            case 'getSudokuCode':
                return this.renderSudokuCode();
            default:
                return this.renderStart();
        }
    }
}
export default App;