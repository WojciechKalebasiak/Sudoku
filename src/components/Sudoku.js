import React, { Component } from 'react';
import Board from './Board';
import sudoku from 'sudoku-umd';
import '../styles/Sudoku.css';
import '../../node_modules/font-awesome/css/font-awesome.css';
//Function for balancing between umd sudoku format and simple array format
function mapWithoutDot(array) {
  const mappedArr = array.map(value => {
    if (value === '.')
      return '';
    else
      return value;
  });
  return mappedArr;
};
//Function for balancing between umd sudoku format and simple array format
function mapWithDot(array) {
  const mappedArr = array.map(value => {
    if (value === '')
      return '.';
    else
      return value;
  });
  return mappedArr;
};
class Sudoku extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialBoard: [],
      board: [],
    }
  }
  componentDidMount = () => {
    this.startGame();
  }
  //set game state depending of props
  //the only way that both are set is when user firstly load game and then change level
  // in this situation props.level become more important than customBoard
  //when customBoard is loaded Start New Game and Reset Game have same functionalities which mean they reset Board
  startGame = () => {
    if (this.props.level) {
      //Spliting and mapping umd sudoku format to classic array format
      let generatedSudoku = mapWithoutDot(sudoku.generate(this.props.level).split(''));
      this.setState({
        initialBoard: generatedSudoku,
        board: generatedSudoku
      });
    }
    if (this.props.customBoard && !this.props.level) {
      this.setState({
        initialBoard: mapWithoutDot(this.props.customBoard),
         board: mapWithoutDot(this.props.customBoard)
       });
    }
  }
  restartGame = () => {
    this.setState({ board: this.state.initialBoard.slice() });
  }
  validate = (index, value) => {
    //User can enter up to 4 digits among which he will choose correct one
    //tested value  is tested by RegExp if it's digit
    // whole value can't be longer than 4 digits
    if ((/[1-9]+$/.test(value) || value === '') && value.length <= 4) {
      const initialBoard = this.state.initialBoard;
      if (initialBoard[index] === '')
        return true;
      if (initialBoard[index] === value)
        return true;
    }
    return false;
  }
  updateBoard = (id, value) => {
    if (this.validate(id, value)) {
      let boardToUpdate = this.state.board.slice();
      //Saving last modified object for undo purposes
      const lastModified = {
        index: id,
        value: boardToUpdate[id]
      }
      //changing current value
      boardToUpdate[id] = value;
      this.setState(prevState => {
        return {
          board: boardToUpdate,
          lastModified
        }
      });
    }
  }
  undo = () => {
    if (this.state.lastModified) {
      this.updateBoard(this.state.lastModified.index, this.state.lastModified.value);
    }
  }
  handleSolve = () => {
    const userAnswer = this.state.board.join('');
    //Mapping current board to sudoku.solve format to check if they equal
    const solvedSudoku = sudoku.solve(mapWithDot(this.state.initialBoard).join(''));
    if (userAnswer === solvedSudoku) {
      this.props.solve(true);
    }
    else
      this.props.solve(false);
  }
  showSolved = () => {
    //Mapping array to get sudoku solving then split it back to set it as new state
    let solvedSudoku = sudoku.solve(mapWithDot(this.state.initialBoard).join(''));
    solvedSudoku = solvedSudoku.split('');
    this.setState({ board: solvedSudoku });
  }
  saveToLocalStorage = () => {
    const sudokuToSave = mapWithDot(this.state.board).join('');
    localStorage.setItem('sudoku', sudokuToSave);
  }
  render = () => {
    //Rendering depends on tried to check corectness of solving
    // if answer is not correct there will be warning displayed
    // if answer is correct function handleSolve will take user to Victory Screen
    if (this.props.done === false) {
      return (<div className={'sudoku'}>
        <div className={'board'}>
          <h1 className={'sudoku-title'}>Sudoku</h1>
          <h2 className={'tip'}>Tip: you can enter several numbers among which you choose correct one</h2>
          <Board board={this.state.board} update={this.updateBoard} />
          <div className={'save-undo-buttons'}>
            <button  className={'save-button'}onClick={this.saveToLocalStorage}>Save to local</button>
            <button className={'undo-button'} onClick={this.undo}><span className={"fa fa-undo"}></span></button>
            <button className={'save-button'} onClick={() => this.props.getCode(mapWithDot(this.state.board).join(''))}>Get Sudoku Code</button>
          </div>
          <h2 className={'wrong-answer'}>Oooops! Something wrong here! Try to fix it!</h2>
        </div>
        <div className={'game-buttons'}>
          <button onClick={this.startGame}>Start New Game</button>
          <button onClick={this.props.changeLevel}>Change Level</button>
          <button onClick={this.restartGame}>Restart Game</button>
          <button onClick={this.handleSolve}>Solve</button>
          <button onClick={this.showSolved}>Show Solved</button>
        </div>
      </div>);
    }
    else {
      return (<div className={'sudoku'}>
        <div className={'board'}>
          <h1 className={'sudoku-title'}>Sudoku</h1>
          <h2 className={'tip'}>Tip: you can enter several numbers among which you choose correct one</h2>
          <Board board={this.state.board} update={this.updateBoard} />
          <div className={'save-undo-buttons'}>
            <button className={'save-button'} onClick={this.saveToLocalStorage}>Save to local</button>
            <button className={'undo-button'} onClick={this.undo}><span className={"fa fa-undo"}></span></button>
            <button className={'save-button'} onClick={() => this.props.getCode(mapWithDot(this.state.board).join(''))}>Get Sudoku Code</button>
          </div>
        </div>
        <div className={'controls'}>
          <div className={'game-buttons'}>
            <button onClick={this.startGame}>Start New Game</button>
            <button onClick={this.restartGame}>Restart Game</button>
            <button onClick={this.props.changeLevel}>Change Level</button>
            <button onClick={this.handleSolve}>Solve</button>
            <button onClick={this.showSolved}>Show Solved</button>
          </div>
        </div>
      </div>);
    }
  }
}
export default Sudoku;
