import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Button from "@material-ui/core/Button";
import "./Minesweeper.css";

const WIDTH = 16;
const HEIGHT = 20;
const NUMMINES = 30;
const MINE = "X";
const HIDDEN = "-";
const FLAG = "F";
const REVEALED = "O";

/**
 * Returns random integer 0 <= n < max
 */
 const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.ceil(max));
};

function Minesweeper() {
  // the board containing the locations of mines
  const [boardData, setBoardData] = useState([]);
  // the state containing revealed and flagged cells
  const [boardState, setBoardState] = useState([]);
  const [flagsLeft, setFlagsLeft] = useState(0);
  const [revealedLeft, setRevealedLeft] = useState(0);
  const [gameState, setGameState] = useState('ongoing');
  const [gameReaction, setGameReaction] = useState(':)');
  const [clickAction, setClickAction] = useState(MINE);

  const printBoard = (board) => {
    console.log("BOARD");
    board.map((row, r) => {
      console.log(`${r}: ${row.join(' ')}`);
    })
  }

  const updateBoardData = (row, col, newVal) => {
    const newBoard = [...boardData];
    newBoard[row][col] = newVal;
    setBoardData(newBoard);
    return newBoard;
  };

  const updateBoardState = (row, col, newVal) => {
    const newBoard = [...boardState];
    newBoard[row][col] = newVal;
    setBoardState(newBoard);
    return newBoard;
  };

  // adds mines to the current board state
  const generateMines = (board, numMines) => {
    if (numMines >= HEIGHT * WIDTH) {
      return board;
    }
    let mines = 0;
    while (mines < numMines) {
      let row = getRandomInt(HEIGHT);
      let col = getRandomInt(WIDTH);
      if (board[row][col] !== MINE) {
        board[row][col] = MINE;
        mines++;
      }
    }
    return board;
  }

  // get the indices of neighbouring cells
  const getNeighbours = (row, col) => {
    const neighbours = [];

    // row above
    if (row > 0) {
      neighbours.push({"row":row-1, "col":col});
      if (col > 0) {
        neighbours.push({"row":row-1, "col":col-1});
      }
      if (col < WIDTH - 1) {
        neighbours.push({"row":row-1, "col":col+1});
      }
    }
    // row below
    if (row < HEIGHT - 1) {
      neighbours.push({"row":row+1, "col":col});
      if (col > 0) {
        neighbours.push({"row":row+1, "col":col-1});
      }
      if (col < WIDTH - 1) {
        neighbours.push({"row":row+1, "col":col+1});
      }
    }
    // either side
    if (col > 0) {
      neighbours.push({"row":row, "col":col-1});
    }
    if (col < WIDTH - 1) {
      neighbours.push({"row":row, "col":col+1});
    }

    return neighbours;
  }

  // sets the numbers that get revealed after clicking
  const generateNums = (board) => {
    for (let row = 0; row < HEIGHT; row++) {
      for (let col = 0; col < WIDTH; col++) {
        if (board[row][col] === MINE) {
          continue;
        }

        let neighbours = getNeighbours(row, col);
        let neighbouringMines = neighbours.filter(coord => board[coord.row][coord.col] === MINE).length;
        board[row][col] = neighbouringMines;
      }
    }
    return board;
  }

  const reveal = (revealed, row, col) => {
    updateBoardState(row, col, REVEALED);
    revealed += 1;
    
    if (boardData[row][col] === 0) {
      let neighbours = getNeighbours(row, col);
      neighbours.map(coord => {
        if (boardState[coord.row][coord.col] !== REVEALED) {
          revealed = reveal(revealed, coord.row, coord.col);
        }
      });
    }
    return revealed;
  }

  const resetBoardData = (width, height) => {
    let newData = [];
    for (let row = 0; row < height; row++) {
      let newRow = new Array(width).fill(-1);
      newData = [...newData, newRow];
    }
    setBoardData(newData);
    return newData;
  }

  const resetBoardState = (width, height) => {
    let newState = [];
    for (let row = 0; row < height; row++) {
      let newRow = new Array(width).fill(HIDDEN);
      newState = [...newState, newRow];
    }
    setBoardState(newState);
    return newState;
  }

  const startNewGame = (width, height) => {
    let newBoard = resetBoardData(width, height);

    newBoard = generateMines(newBoard, NUMMINES);
    newBoard = generateNums(newBoard);

    setBoardData(newBoard);

    setRevealedLeft(WIDTH * HEIGHT - NUMMINES);
    setFlagsLeft(NUMMINES);

    resetBoardState(width, height);

    setGameState("ongoing");
 };

  const clickCell = (e, row, col) => {
    if (e.button === 0 && gameState === "ongoing") {
      // left click
      e.preventDefault();
      if (clickAction === MINE && boardState[row][col] !== FLAG) {
        // reveal
        const revealed = reveal(0, row, col);
        if (boardData[row][col] === MINE) {
          setGameState("lost");
          console.log("game lost");
        } else {
          if (revealedLeft - revealed === 0) {
            setGameState("won");
            console.log("game won");
          } else {
            setRevealedLeft(revealedLeft - revealed);
          }
        }
      } else if (clickAction === FLAG) {
        // flag
        if (boardState[row][col] === FLAG) {
          // toggle to no flag
          updateBoardState(row, col, HIDDEN);
          setFlagsLeft(flagsLeft + 1);
        } else if (boardState[row][col] === HIDDEN && flagsLeft > 0) {
          // toggle to flag
          updateBoardState(row, col, FLAG);
          setFlagsLeft(flagsLeft - 1);
        }
      }
    }
  };

  useEffect(() => {
    startNewGame(WIDTH, HEIGHT);
  }, []);

  useEffect(() => {
    if (gameState === "lost") {
      // reveal all mines
      for (let row = 0; row < HEIGHT; row++) {
        for (let col = 0; col < WIDTH; col++) {
          if (boardData[row][col] === MINE) {
            updateBoardState(row, col, REVEALED);
          }
        }
      }
      setGameReaction("X(");

    } else if (gameState === "won") {
      // win graphic?
      setGameReaction("8)");

    } else if (gameState === "ongoing") {
      setGameReaction(":)");
    }
  }, [gameState]);

  useEffect(() => {
    printBoard(boardData);
  }, [boardData]);

  useEffect(() => {
    console.log(revealedLeft);
  }, [revealedLeft]);

  return (
    <div className="MinesweeperApp">
      <div className="title">
        <Typography variant="h2">minesweeper</Typography>
      </div>
      <main>
        <div className="minesweeper">
          
          <div className="gameDetails">
            <Typography variant="h5">{flagsLeft} mines left</Typography>
          </div>
          <div className="toggleDiv">
            <ToggleButtonGroup
              value={clickAction}
              exclusive
              onChange={(e, newAction) => {setClickAction(newAction)}}
              aria-label="toggle click action"
            >
              <ToggleButton value={MINE} aria-label="click to mine">
                X
              </ToggleButton>
              <ToggleButton value={FLAG} aria-label="click to flag">
                F
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
          <div className="board">
            {boardState.map((row, i) =>
              row.map((state, j) =>
                state === REVEALED ? (
                  <div
                    className={`revealedCell cell cell${boardData[i][j]}`}
                    key={`${i}-${j}`}
                  >
                    <p>{boardData[i][j] === MINE ? "X" : boardData[i][j]}</p>
                  </div>
                ) : (
                  <div
                    className={state === FLAG ? "cell flagCell" : "cell hiddenCell"}
                    onClick={(e) => clickCell(e, i, j)}
                    onContextMenu={() => {return false}}
                    key={`${i}-${j}`}
                  ></div>
                )
              )
            )}
          </div>
          <div className="gameReactions">
            <Typography variant="h5">{gameReaction}</Typography>
          </div>
          <div className="gameActions">
            <Button variant={gameState == "ongoing" ? "outlined" : "contained"} color="secondary" onClick={() => startNewGame(WIDTH, HEIGHT)}>Restart</Button>
          </div> 
        </div>
      </main>
    </div>
  );
}

export default Minesweeper;
