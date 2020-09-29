import React, { Component } from 'react';
import Line2 from '../../components/Line2.png'
import { makeStyles } from '@material-ui/core/styles';
import {AppBar,Toolbar,Typography,Button,IconButton} from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  logo: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Navbar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <IconButton edge="start" className={classes.logo} color="inherit" aria-label="menu">
            <img src={Line2} width="250px" alt=""></img>
          </IconButton>
          <Typography variant="h6" className={classes.title}/>
          <Button color="inherit" size="large" style={{height:"70px", width:"110px"}}>Sign Up</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
