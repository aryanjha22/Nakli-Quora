import React from 'react';
import Line2 from '../../components/Line2.png'
import { makeStyles } from '@material-ui/core/styles';
import {AppBar,Toolbar,Typography,Button,IconButton} from '@material-ui/core';
import {Link} from 'react-router-dom'

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
            <Link to="/">
              <img src={Line2} width="250px" alt=""/>
            </Link>
          </IconButton>
          <Typography variant="h6" className={classes.title}/>
          
          <Link to="/register">
            <Button color="inherit"  style={{height:"55px", width:"110px",color:"black",backgroundColor: "#21b6ae"}} variant="contained">
              <Typography>Sign Up</Typography>
            </Button>
          </Link>
        
        </Toolbar>
      </AppBar>
    </div>
  );
}
