import { Button } from "@material-ui/core";
import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import TicTacToe from "./pages/TicTacToe";
import Minesweeper from "./pages/Minesweeper";

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/tictactoe">
          <header>
            <Button className="back" component={Link} to="/">
              Back
            </Button>
          </header>
          <TicTacToe />
        </Route>
        <Route exact path="/minesweeper">
          <header>
            <Button className="back" component={Link} to="/">
              Back
            </Button>
          </header>
          <Minesweeper />
        </Route>
      </Router>
    </div>
  );
}

export default App;
