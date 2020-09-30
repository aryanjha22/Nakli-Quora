import React,{Component} from 'react'
import {Container, Grid, Typography,TextField, Button} from '@material-ui/core'
import welcome from '../../components/welcome.jpg'
import pen from '../../components/pen.jpg'
import {Link} from 'react-router-dom'



export default class Landing extends Component {
    constructor(){
        super();
        this.state = {
          email: '',
          password: '',
          errors: {}
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }
    onChange(e){
        this.setState({[e.target.id] : e.target.value})
    }

    onSubmit(e){
        e.preventDefault();
    
        const user ={
          
          email: this.state.email,
          password: this.state.password,
          
        }
    
        console.log(user)
      }
    
    
    render() {
        return (
            <div style={{backgroundImage: `url(${pen})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                width:"100%",
                height:"635px"
                
            }}>
                <Container>
                    <Grid container alignItems="center">
                        <Grid item xs={6} sm={3}>
                            <img src={welcome} 
                                style={{
                                    marginRight:"100px",
                                    marginTop:"135px",
                                    fontSize:"20px"}} 
                                alt="">
                            </img>
                        </Grid>
                        
                            <Grid item xs={6} sm={3} style={{
                                    marginLeft: 'auto',
                                    marginRight:'110px',
                                    marginTop:"50px"
                                }} 
                                
                            >
                            <h1>Login</h1>
                            
                                
                                <form noValidate autoComplete="off" onSubmit={this.onSubmit}>  
                                    <TextField 
                                        style={{width: '35ch'}} 
                                        id="email" 
                                        label="Email" 
                                        variant="outlined"
                                        value={this.state.email}
                                        onChange={this.onChange}
                                    />
                                    <br/><br/>

                                    <TextField 
                                        style={{width: '35ch'}} 
                                        id="password" 
                                        label="Password" 
                                        variant="outlined" 
                                        value={this.state.password}
                                        onChange={this.onChange}
                                    />
                                
                            
                                <br/><br/>
                                <Grid item xs={6} sm={3}>
                                    <Button 
                                        id="submit"
                                        size="large" 
                                        type="submit"                                    
                                        color="primary" 
                                        variant="contained" 
                                        style={{marginRight:"20px"}}

                                    >
                                        Login
                                    </Button> 
                                </Grid>
                            </form>
                            
                            <br/>
                            
                            <Link to="/register">
                                Forget Password?
                            </Link>
                            
                            <br/>

                            <Link to="/register">
                                Not a User yet? Sign Up
                            </Link>
                        </Grid>
                    </Grid> 
                </Container>
            </div>
        )
    }
}





 