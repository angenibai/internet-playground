import React, { useState, useEffect } from "react";
import "./TicTacToe.css";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const SIZE = 3;
const initialGame = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

const TicTacToe = () => {
  const [game, setGame] = useState(initialGame);
  const [gameState, setGameState] = useState("ongoing");
  const [curPlayer, setCurPlayer] = useState("X");

  const updateGame = (row, col, val) => {
    const newGame = [...game];
    newGame[row][col] = val;
    setGame(newGame);
  };

  const restartGame = () => {
    for (let i = 0; i < SIZE; i++) {
      for (let j = 0; j < SIZE; j++) {
        updateGame(i, j, "");
      }
    }
    setGameState("ongoing");
    setCurPlayer("X");
  };

  const checkTie = () => {
    let tie = true;
    for (let i = 0; i < SIZE; i++) {
      for (let j = 0; j < SIZE; j++) {
        if (game[i][j] === "") {
          tie = false;
          break;
        }
      }
      if (!tie) {
        break;
      }
    }
    return tie;
  };

  const checkWin = () => {
    let winner = false;

    for (let i = 0; i < SIZE; i++) {
      if (
        game[i][0] === game[i][1] &&
        game[i][1] === game[i][2] &&
        game[i][0] !== ""
      ) {
        winner = game[i][0];
      }
      if (
        game[0][i] === game[1][i] &&
        game[1][i] === game[2][i] &&
        game[0][i] !== ""
      ) {
        winner = game[0][i];
      }
    }
    if (
      game[0][0] === game[1][1] &&
      game[1][1] === game[2][2] &&
      game[0][0] !== ""
    ) {
      winner = game[0][0];
    }
    if (
      game[0][2] === game[1][1] &&
      game[1][1] === game[2][0] &&
      game[0][2] !== ""
    ) {
      winner = game[0][2];
    }
    return winner;
  };

  const clickCell = (row, col) => {
    if (gameState === "ongoing" && game[row][col] === "") {
      updateGame(row, col, curPlayer);
      setCurPlayer(curPlayer === "X" ? "O" : "X");
    }
  };

  useEffect(() => {
    const winner = checkWin();
    if (winner) {
      setGameState(winner);
    } else if (checkTie()) {
      setGameState("tie");
    } else {
      setGameState("ongoing");
    }
  }, [game]);

  return (
    <div className="TicTacToeApp">
      <div className="title">
        <Typography variant="h2">tic tac toe</Typography>
      </div>
      <main>
        <div className="ticTacGrid">
          {game.map((row, rowIdx) =>
            row.map((val, colIdx) => (
              <div
                className={
                  val === "" && gameState === "ongoing"
                    ? "activeCell"
                    : "inactiveCell"
                }
                key={`${rowIdx}-${colIdx}`}
                onClick={() => clickCell(rowIdx, colIdx)}
              >
                <p className="cellText">{val}</p>
              </div>
            ))
          )}
        </div>
        <div className="ticTacDetails">
          {gameState === "ongoing" ? (
            <Typography variant="h4">{curPlayer}'s turn</Typography>
          ) : gameState === "tie" ? (
            <Typography variant="h4">Tie!</Typography>
          ) : (
            <Typography variant="h4">{gameState} won!</Typography>
          )}
        </div>
        <div className="ticTacActions">
          <Button
            type="button"
            className="restartBtn"
            onClick={restartGame}
            variant={gameState === "ongoing" ? "outlined" : "contained"}
            color="secondary"
          >
            Restart
          </Button>
        </div>
      </main>
    </div>
  );
}

export default TicTacToe;
