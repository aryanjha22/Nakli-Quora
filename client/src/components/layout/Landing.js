import React,{Component} from 'react'
import {Container, Grid,TextField, Button} from '@material-ui/core'
import welcome from '../../components/welcome.jpg'
import pen from '../../components/pen.jpg'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {loginUser} from '../../actions/authActions'



class Landing extends Component {
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

    componentDidMount(){
        if(this.props.auth.isAuthenticated){
            this.props.history.push('/dashboard')
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.auth.isAuthenticated){
            this.props.history.push('/dashboard')
        }
        
        if(nextProps.errors){
            this.setState({errors: nextProps.errors})
        }
    }

    onSubmit(e){
        e.preventDefault();
    
        const userData ={
          
          email: this.state.email,
          password: this.state.password,
          
        }
    
        this.props.loginUser(userData)
      }
    
    
    render() {
        const {errors} = this.state

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
                                        required
                                        style={{width: '35ch'}} 
                                        id="email" 
                                        label="Email" 
                                        variant="outlined"
                                        value={this.state.email}
                                        onChange={this.onChange}
                                        error = {errors.email}
                                        helperText={errors.email}
                                        
                                    />
                                    <br/><br/>

                                    <TextField 
                                        required
                                        style={{width: '35ch'}} 
                                        id="password" 
                                        type = "password"
                                        label="Password" 
                                        variant="outlined" 
                                        value={this.state.password}
                                        onChange={this.onChange}
                                        error = {errors.password}
                                        helperText={errors.password}
                                       
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

Landing.propTypes ={
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.string.isRequired
}

const mapStateToProps = (state) =>({
    auth: state.auth,
    errors: state.errors
})

export default connect(mapStateToProps, {loginUser})(Landing)



 