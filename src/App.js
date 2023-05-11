import './App.css';
import { useState, useEffect } from 'react';

function App() {

  const [overAllBoard, setOverAllBoard] = useState([]);
  const [overAllscore, setOverAllscore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState(null);
  const [config, setConfig] = useState(false);
  const [newBoardSize, setNewBoardSize] = useState(4);
  const initBoard = (size) => {
    let current_board = Array(size).fill().map(() => Array(size).fill(0));
    setOverAllscore(0);
    setGameOver(false);
    setMessage(null);
    current_board = placeRandom(placeRandom(current_board));
    setOverAllBoard(current_board);
  }


  useEffect(() => {
    initBoard(4);
   
  }, []);
 
  

  const placeRandom = (board) => {
    const blankCoordinates = getBlankCoordinates(board);
    const randomCoordinate = blankCoordinates[Math.floor(Math.random() * blankCoordinates.length)];
    const randomNumber = randomStartingNumber();
    board[randomCoordinate[0]][randomCoordinate[1]] = randomNumber;
    return board;
  }
  const getBlankCoordinates = (board) => {
    const blankCoordinates = [];
    
    for (let r = 0; r < board.length; r++) {
      for (let c = 0; c < board[r].length; c++) {
        if (board[r][c] === 0) {blankCoordinates.push([r, c])}
      }
    }
            
    return blankCoordinates;
  }
  
  const randomStartingNumber = () => {
    const startingNumbers = [2,4];
    const randomNumber = startingNumbers[Math.floor(Math.random() * startingNumbers.length)];
    return randomNumber;
  }
  const boardMoved = (original, updated) => {
    return (JSON.stringify(updated) !== JSON.stringify(original)) ? true : false;
  }
  
  const move = (direction) => {
    if (!gameOver) {
      if (direction === 'up') {
        console.log("movedUp");
        const movedUp = moveUp(overAllBoard);
        if (boardMoved(overAllBoard, movedUp.board)) {
          const upWithRandom = placeRandom(movedUp.board);
          
          if (checkForGameOver(upWithRandom)) {
            setOverAllBoard(upWithRandom);
            setGameOver(true);
            setMessage("Game over!");
          } else {
            setOverAllBoard(upWithRandom);
            let newScore1 = overAllscore + movedUp.score;
            setOverAllscore(newScore1);
            checkForGameWon(upWithRandom);
          }
        }
      } else if (direction === 'right') {
        const movedRight = moveRight(overAllBoard);
        if (boardMoved(overAllBoard, movedRight.board)) {
          const rightWithRandom = placeRandom(movedRight.board);
          
          if (checkForGameOver(rightWithRandom)) {
            setOverAllBoard(rightWithRandom);
            setGameOver(true);
            setMessage("Game over!");
          } else {
            setOverAllBoard(rightWithRandom);
            let newScore2 = overAllscore + movedRight.score;
            setOverAllscore(newScore2);
            checkForGameWon(rightWithRandom);
          }
        }
      } else if (direction === 'down') {
        const movedDown = moveDown(overAllBoard);
        if (boardMoved(overAllBoard, movedDown.board)) {
          const downWithRandom = placeRandom(movedDown.board);
          
          if (checkForGameOver(downWithRandom)) {
            setOverAllBoard(downWithRandom);
            setGameOver(true);
            setMessage("Game over!");
          } else {
            setOverAllBoard(downWithRandom);
            var newScore3 = overAllscore + movedDown.score;
            setOverAllscore(newScore3);
            checkForGameWon(downWithRandom);
          }
        }
      } else if (direction === 'left') {
        const movedLeft = moveLeft(overAllBoard);
        if (boardMoved(overAllBoard, movedLeft.board)) {
          const leftWithRandom = placeRandom(movedLeft.board);
          
          if (checkForGameOver(leftWithRandom)) {
            setOverAllBoard(leftWithRandom);
            setGameOver(true);
            setMessage("Game over!");
          } else {
            setOverAllBoard(leftWithRandom);
            var newScore4 = overAllscore+movedLeft.score;
            setOverAllscore(newScore4);
            checkForGameWon(leftWithRandom);
          }
        }
      }
    } else {
      setMessage("Game over. Please start a new game.");
    }
  }
  
  const moveUp = (inputBoard) => {
    let rotatedRight = rotateRight(inputBoard);
    let board = [];
    let score = 0;

    for (let r = 0; r < rotatedRight.length; r++) {
      let row = [];
      for (let c = 0; c < rotatedRight[r].length; c++) {
        let current = rotatedRight[r][c];
        (current === 0) ? row.unshift(current) : row.push(current);
      }
      board.push(row);
    }

    for (let r = 0; r < board.length; r++) {
      for (let c = board[r].length - 1; c >= 0; c--) {
        if (board[r][c] > 0 && board[r][c] === board[r][c - 1]) {
          board[r][c] = board[r][c] * 2;
          board[r][c - 1] = 0;
          score += board[r][c];
        } else if (board[r][c] === 0 && board[r][c - 1] > 0) {
          board[r][c] = board[r][c - 1];
          board[r][c - 1] = 0;
        }
      }
    }
    board = rotateLeft(board);

    return {board, score};
  }
  
  const moveRight = (inputBoard) => {
    let board = [];
    let score = 0;

    for (let r = 0; r < inputBoard.length; r++) {
      let row = [];      
      for (let c = 0; c < inputBoard[r].length; c++) {
        let current = inputBoard[r][c];
        (current === 0) ? row.unshift(current) : row.push(current);
      }
      board.push(row);
    }

    for (let r = 0; r < board.length; r++) {
      for (let c = board[r].length - 1; c >= 0; c--) {
        if (board[r][c] > 0 && board[r][c] === board[r][c - 1]) {
          board[r][c] = board[r][c] * 2;
          board[r][c - 1] = 0;
          score += board[r][c];
        } else if (board[r][c] === 0 && board[r][c - 1] > 0) {
          board[r][c] = board[r][c - 1];
          board[r][c - 1] = 0;
        }
      }
    }

    return {board, score};
  }
  
  const moveDown = (inputBoard) => {
    let rotatedRight = rotateRight(inputBoard);
    let board = [];
    let score = 0;

    for (let r = 0; r < rotatedRight.length; r++) {
      let row = [];      
      for (let c = rotatedRight[r].length - 1; c >= 0; c--) {
        let current = rotatedRight[r][c];
        (current === 0) ? row.push(current) : row.unshift(current);
      }
      board.push(row);
    }
    for (let r = 0; r < board.length; r++) {
      for (let c = 0; c < board.length; c++) {
        if (board[r][c] > 0 && board[r][c] === board[r][c + 1]) {
          board[r][c] = board[r][c] * 2;
          board[r][c + 1] = 0;
          score += board[r][c];
        } else if (board[r][c] === 0 && board[r][c + 1] > 0) {
          board[r][c] = board[r][c + 1];
          board[r][c + 1] = 0;
        }
      }
    }

    board = rotateLeft(board);

    return {board, score};
  }
  
  const moveLeft = (inputBoard) => {
    let board = [];
    let score = 0;

    for (let r = 0; r < inputBoard.length; r++) {
      let row = [];      
      for (let c = inputBoard[r].length - 1; c >= 0; c--) {
        let current = inputBoard[r][c];
        (current === 0) ? row.push(current) : row.unshift(current);
      }
      board.push(row);
    }

    for (let r = 0; r < board.length; r++) {
      for (let c = 0; c < board.length; c++) {
        if (board[r][c] > 0 && board[r][c] === board[r][c + 1]) {
          board[r][c] = board[r][c] * 2;
          board[r][c + 1] = 0;
          score += board[r][c];
        } else if (board[r][c] === 0 && board[r][c + 1] > 0) {
          board[r][c] = board[r][c + 1];
          board[r][c + 1] = 0;
        }
      }
    }
    
    return {board, score};
  }
  
  const rotateRight = (matrix) => {
    let result = [];
	
  	for (let c = 0; c < matrix.length; c++) {
	  	let row = [];
	  	for (let r = matrix.length - 1; r >= 0; r--) {
			  row.push(matrix[r][c]);
		  }
      result.push(row);
	  }
	
	  return result;
  }
  
  const rotateLeft = (matrix) => {
  	let result = [];

    for (let c = matrix.length - 1; c >= 0; c--) {
      let row = [];
      for (let r = matrix.length - 1; r >= 0; r--) {
        row.unshift(matrix[r][c]);
      }
      result.push(row);
    }

    return result;
  }
  const checkForGameOver = (board) => {
    let moves = [
      boardMoved(board, moveUp(board).board),
      boardMoved(board, moveRight(board).board),
      boardMoved(board, moveDown(board).board),
      boardMoved(board, moveLeft(board).board)
    ];
    
    return (moves.includes(true)) ? false : true;
  }

  const checkForGameWon = (board) => {
  	for (let c = 0; c < board.length; c++) {
	  	for (let r = board[c].length - 1; r >= 0; r--) {
			  if(board[c][r] == 2048){
          setMessage("Game Won");
          setGameOver(true);
          return;
        }
		  }
	  }
  }

  const handleChangeConfig = (event) => {
    let new_size = event.target.value;
    console.log("changed");
    console.log(new_size);
    if(parseInt(new_size) != NaN && parseInt(new_size)>1){
      setNewBoardSize(new_size);
    }
    
  }
  const ChangeConfig = () => {
    console.log(newBoardSize);
    if(newBoardSize>1){
      initBoard(parseInt(newBoardSize));
    }
    
  }

    
  return (
    <div className='mainDiv'>        
        <h1>2048 Game</h1>
        <div className='buttons2'>
          <div className="button" onClick={() => {initBoard(4)}}>New Game</div>
          <div className='customSpace'/>
          <input type="number" pattern="[0-9]*" defaultValue='4' onChange={handleChangeConfig} />  
          <div className='customSpace'/>
          <div className="button" onClick={ChangeConfig}>Change Configuration</div>
        </div>
      
        
        
        <div className="score">Score: {overAllscore}</div>
        
        <table>
          <tbody>
          {overAllBoard.map((row, i) => (<Row key={i} row={row} />))}
          </tbody>
          
        </table>
        <div className='customSpaceHeight'/>
        <div className="buttons">
          <div className="button" onClick={() => {move('up')}}>U</div>
          <div className='buttons2'>
            <div className="button" onClick={() => {move('left')}}>L</div>
            <div className='customSpace'/>
            <div className="button" onClick={() => {move('down')}}>D</div>
            <div className='customSpace'/>
            <div className="button" onClick={() => {move('right')}}>R</div>
          </div>
        </div>
        
        <p>{message}</p>
      </div>
  );
}

const Row = ({ row }) => {
  return (
    <tr>
      {row.map((cell, i) => (<Cell key={i} cellValue={cell} />))}
    </tr>
  );
};

const Cell = ({ cellValue }) => {
  let color = 'cell';
  let value = (cellValue === 0) ? '' : cellValue;
  if (value) {
    color += ` color-${value}`;
  }

  return (
    <td>
      <div className={color}>
        <div className="number">{value}</div>
      </div>
    </td>
  );
};

export default App;
