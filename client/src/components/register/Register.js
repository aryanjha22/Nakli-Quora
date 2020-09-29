import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Button,Typography } from '@material-ui/core';
import signup from '../../components/signup.jpg'
import {Link} from 'react-router-dom'


const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    
  },
  background: {
    background:`url(${signup})`,
    minWidth: "100%",
    position: "fixed",
    minHeight: "89%",
    backgroundSize: "cover",
    backgroundPosition: "center"
  }
}));

export default function FormPropsTextFields() {
  const classes = useStyles();

  return (
      <div>
      <Container className={classes.root} maxWidth="xs">         
        <h1>Sign Up</h1>
        <form  noValidate autoComplete="off">
        
        
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <TextField
                    required
                    id="filled-required"
                    label="First Name"
                    defaultValue=""
                    variant="filled"
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    required
                    id="filled-required"
                    label="Last Name"
                    defaultValue=""
                    variant="filled"
                />
            </Grid>

            <Grid item xs={12}>
                <TextField
                    required
                    id="filled-required"
                    label="Email"
                    fullWidth
                    defaultValue=""
                    variant="filled"
                />
            </Grid>

           <Grid item xs={12} sm={6}>
                <TextField
                    required
                    id="filled-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    variant="filled"
                />
            </Grid>
                
          <Grid item xs={12} sm={6}>
                <TextField
                    required
                    id="filled-password-input"
                    label="Confirm Password"
                    type="password"
                    autoComplete="current-password"
                    variant="filled"
                />
           </Grid>
            
        
        </Grid> 
        
        <br/>
        
        <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Sign Up
          </Button>
             
        </form>
        
    </Container>
    
    
    {/* Copyright message */}
    
    {/* <Typography style={{marginRight:"200px"}} variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link to ="/" color="inherit">
            Nakli Quora
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
        </Typography> */}
    </div>
  );
}
