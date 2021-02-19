import React from 'react';
import Square from './Square';
import '../style/index.css';
import '../config/config'
class Board extends React.Component {
    renderSquare(i) {
       //如果连成线并且在线上，红色，否则，黑色
      let color;
      if(this.props.line && this.props.line.includes(i)) {
        color = "red";
      } else {
        color = "black";
      }
      return (
        <Square
          value={this.props.squares[i]}
          color={color}
          onClick={() => this.props.onClick(i)}
        />
      );
    }
  
    render() {
      var n=0
      let board=[]
      for(var i=0;i<global.data.M;i++){
        var boardRow=[]
        for(var j=0;j<global.data.M;j++,n++){
          boardRow.push(this.renderSquare(n))
        }
        board.push(<div className="board-row" key={i}>{boardRow}</div>)
      }
      return (
        <div>{board}</div>)
    }
  }
  export default Board;