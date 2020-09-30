import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import { Container, Grid, Button} from '@material-ui/core';
import {Link} from 'react-router-dom'



export default class Register extends Component {
  constructor(){
    super();
    this.state = {
      first_name : '',
      last_name : '',
      email: '',
      password: '',
      password2: '',
      errors: {}
    };
    
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

  }

  onChange(e){
    this.setState({ [e.target.id] : e.target.value})
  }

  onSubmit(e){
    e.preventDefault();

    const newUser ={
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
    }

    console.log(newUser)
  }
    
   
  render() {
    return (
      <div>

      <Container maxWidth="xs"
        style={{
          marginTop: "30px",
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >         
        <h1>Sign Up</h1>
        
        <form autoComplete="off" noValidate onSubmit={this.onSubmit}>
        
        
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <TextField
                    required
                    id="first_name"
                    label="First Name"
                    variant="filled"
                    value={this.state.first_name}
                    onChange={this.onChange}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    required
                    id="last_name"
                    label="Last Name"
                    variant="filled"
                    value={this.state.last_name}
                    onChange={this.onChange}
                />
            </Grid>

            <Grid item xs={12}>
                <TextField
                    required
                    id="email"
                    label="Email"
                    fullWidth
                    variant="filled"
                    value={this.state.email}
                    onChange={this.onChange}
                />
            </Grid>

           <Grid item xs={12} sm={6}>
                <TextField
                    required
                    id="password"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    variant="filled"
                    value={this.state.password}
                    onChange={this.onChange}
                />
            </Grid>
                
          <Grid item xs={12} sm={6}>
                <TextField
                    required
                    id="password2"
                    label="Confirm Password"
                    type="password"
                    autoComplete="current-password"
                    variant="filled"
                    value={this.state.password2}
                    onChange={this.onChange}
                />
           </Grid>           
        
        </Grid> 
        
        <br/>
        
        <Button
            id="submit"
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
}

