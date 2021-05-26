import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Typography } from '@material-ui/core';
import './Home.css';

const Home = () => {

  return (
    <div className="Home">
      <header>
        <Typography variant="h2">genie's internet playground</Typography>
      </header>
      <Grid container spacing={2} className="gamesContainer">
        <Grid item xs={12} sm={4} className="gameCell">
          <Link to="/tictactoe">Tic Tac Toe</Link>
        </Grid>
        <Grid item xs={12} sm={4} className="gameCell">
          <Link to="/tictactoe">Tic Tac Toe</Link>
        </Grid>
        <Grid item xs={12} sm={4} className="gameCell">
          <Link to="/tictactoe">Tic Tac Toe</Link>
        </Grid>
        
      </Grid>
    </div>
  )
}

export default Home;