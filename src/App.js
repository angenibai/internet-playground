import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import { Link } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import TicTacToe from './pages/TicTacToe';

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
      </Router>
    </div>
  );
}

export default App;
