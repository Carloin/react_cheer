import '../style/index.css';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {/* {props.value} */}
      <font color={props.color}>{props.value}</font>
    </button>
  );
}

export default Square;
