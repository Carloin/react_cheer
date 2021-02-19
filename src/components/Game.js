import Board from './Board'
import React from 'react';
import '../style/index.css';
import '../config/config'
const M=global.data.M
class Game extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        history: [
          {
            squares: Array(M*M).fill(null),
            row: null,
            col: null,
          }
        ],
        stepNumber: 0,
        xIsNext: true,
        startToEnd : true,
      };
    }
  
    handleClick(i) {
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      // if (calculateWinner(squares).winner || squares[i]) {
      //   return;
      // }
      // 五子棋写法
      if(calculateWinner(squares, current.row, current.col).winner || squares[i]) {
        return;
             }
      squares[i] = this.state.xIsNext ? "X" : "O";
      this.setState({
        history: history.concat([
          {
            squares: squares,
            row: parseInt(i/M)+1,
            col: i%M+1,
          }
        ]),
        stepNumber: history.length,
        xIsNext: !this.state.xIsNext
      });
    }
  
    jumpTo(step) {
      this.setState({
        stepNumber: step,
        xIsNext: (step % 2) === 0
      });
    }
    changeOrder() {
      this.setState({
        startToEnd : !this.state.startToEnd,
      })
    }
    render() {
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      // const result = calculateWinner(current.squares);
      const result = calculateWinner(current.squares, current.row, current.col);
      const winner = result.winner;
      const lines = result.lines;
  
      const moves = history.map((step, move) => {
        const desc = move ?
          'Go to move #' + move+'('+step.row+','+step.col+')' :
          'Go to game start';
       let strongFont=this.state.stepNumber===move?'boldLi':''
     
       return (
          <li key={move}>
            <button className={strongFont} onClick={() => this.jumpTo(move)}>{desc}</button>
          </li>
        );
      });
      let orderableMoves;
      if(this.state.startToEnd) {
        orderableMoves = moves;
      } else {
        orderableMoves = moves.reverse();
      }
      let status;
      if(winner) {
        status = 'Winner: ' + winner;
      } else if(!winner && this.state.stepNumber === M*M) {
        status = 'MATCH!';
      } else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }
  
      return (
        <div className="game">
          <div className="game-board">
            <Board
              squares={current.squares}
              line={lines}
              onClick={i => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div>{status}</div><button onClick={() => {this.changeOrder()}}>↑↓</button>
            <ol>{orderableMoves}</ol>
          </div>
        </div>
      );
    }
  }
  // function calculateWinner(squares) {
  //   const lines = [
  //     [0, 1, 2],
  //     [3, 4, 5],
  //     [6, 7, 8],
  //     [0, 3, 6],
  //     [1, 4, 7],
  //     [2, 5, 8],
  //     [0, 4, 8],
  //     [2, 4, 6]
  //   ];
  //   for (let i = 0; i < lines.length; i++) {
  //     const [a, b, c] = lines[i];
  //     if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
  //       return {winner : squares[a], lines : lines[i]};
  //     }
  //   }
  //   return {winner : null, lines: null};
  // }

  function calculateWinner(squares, x, y) {
    //before start
    if(!x || !y) {
    return {winner : null, lines : null}; 
       }
    
    //1D -> 2D
    var board = [];
    var n = 0;
    for(var i=0; i<M; i++) {
    board[i] = [];
    for(var j=0; j<M; j++, n++) {
    board[i][j] = squares[n];
         }
       }
    
    //as array starts from zero
    x = x-1;
    y = y-1;
    let mark = board[x][y];
   
    var lines = [[], [], [], [], [], [], [], []];
    var goOn = Array(8).fill(true);
   
    for(var step=1; step<=4; step++) {
    //↑0
    if(goOn[0] && x-step >= 0) {
    if(board[x-step][y] === mark) {
    lines[0].push((x-step)*M + y);
           } else {
    goOn[0] = false;
           }
         }
    //↗ 1
    if(goOn[1] && x-step >= 0 && y+step < M) {
    if(board[x-step][y+step] === mark) {
    lines[1].push((x-step)*M + y+step);
           } else {
    goOn[1] = false;
           }
         }
    //→ 2
    if(goOn[2] && y+step < M) {
    if(board[x][y+step] === mark) {
    lines[2].push(x*M + y+step);
           } else {
    goOn[2] = false;
           }
         }
    //↘ 3
    if(goOn[3] && x+step < M && y+step < M) {
    if(board[x+step][y+step] === mark) {
    lines[3].push((x+step)*M + y+step);
           } else {
    goOn[3] = false;
           }
         }
    //↓ 4
    if(goOn[4] && x+step < M) {
    if(board[x+step][y] === mark) {
    lines[4].push((x+step)*M + y);
           } else {
    goOn[4] = false;
           }
         }
    //↙ 5
    if(goOn[5] && x+step < M && y-step >= 0) {
    if(board[x+step][y-step] === mark) {
    lines[5].push((x+step)*M + y-step);
           } else {
    goOn[5] = false;
           }
         }
    //← 6
    if(goOn[6] && y-step >= 0) {
    if(board[x][y-step] === mark) {
    lines[6].push(x*M + y-step);
           } else {
    goOn[6] = false;
           }
         }
    //↖ 7
    if(goOn[7] && x-step >= 0 && y-step >= 0) {
    if(board[x-step][y-step] === mark) {
    lines[7].push((x-step)*M + y-step);
           } else {
    goOn[7] = false;
           }
         }
       }
   
    if(lines[0].length+lines[4].length >= 4) {
    return {winner : mark, lines : [x*M+y].concat(lines[0]).concat(lines[4])};
       } else if(lines[1].length+lines[5].length >= 4) {
    return {winner : mark, lines : [x*M+y].concat(lines[1]).concat(lines[5])};
       } else if(lines[2].length+lines[6].length >= 4) {
    return {winner : mark, lines : [x*M+y].concat(lines[2]).concat(lines[6])};
       } else if(lines[3].length+lines[7].length >= 4) {
    return {winner : mark, lines : [x*M+y].concat(lines[3]).concat(lines[7])};
       } else {
    return {winner : null, lines : null};
       }
     }
  export default Game