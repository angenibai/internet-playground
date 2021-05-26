import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Typography } from '@material-ui/core';
import './Home.css';
import ticTacToeIcon from '../images/tictactoe-icon.png';
import GridItem from '../components/GridItem';

const Home = () => {

  return (
    <div className="Home">
      <header>
        <Typography variant="h2">genie's internet playground</Typography>
      </header>
      <Grid container spacing={2} className="gamesContainer">
        <GridItem
          icon={ticTacToeIcon}
          alt="tic tac toe icon"
          link="/tictactoe"
          title="Tic Tac Toe"
        />
        <GridItem
          icon={ticTacToeIcon}
          alt="tic tac toe icon"
          link="/tictactoe"
          title="Tic Tac Toe"
        /> 
        <GridItem
          icon={ticTacToeIcon}
          alt="tic tac toe icon"
          link="/tictactoe"
          title="Tic Tac Toe"
        />
        <GridItem
          icon={ticTacToeIcon}
          alt="tic tac toe icon"
          link="/tictactoe"
          title="Tic Tac Toe"
        />
      </Grid>
    </div>
  )
}

export default Home;