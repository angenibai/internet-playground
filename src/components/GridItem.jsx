import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import "./GridItem.css";

const GridItem = (props) => {
  return (
    <Grid item xs={12} sm={4} className="gameCell">
      <div className="cellIcon">
        <Link to={props.link}>
          <img className="gameIcon" src={props.icon} alt={props.alt} />
        </Link>
      </div>
      <div className="cellTitle">
        <Link className="gameTitle" to={props.link}>
          <Typography variant="h5">{props.title}</Typography>
        </Link>
      </div>
    </Grid>
  );
};

export default GridItem;
