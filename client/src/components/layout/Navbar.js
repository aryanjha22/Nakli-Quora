import React,{Component} from 'react';
import Line2 from '../../components/Line2.png'
import {AppBar,Toolbar,Typography,Button,IconButton} from '@material-ui/core';
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {logoutUser} from '../../actions/authActions'


class Navbar extends Component {
  onLogoutClick(e){
    e.preventDefault()
    this.props.logoutUser()
  }
  
  render() {
    const {isAuthenticated, user} = this.props.auth

    const authLinks = (
      <a href="#" onClick={this.onLogoutClick.bind(this)}>
        <Button color="secondary"  style={{height:"55px", width:"110px",color:"black",backgroundColor: "magenta"}} variant="contained">
          <img 
            src={user.avatar} 
            alt={user.first_name}
            style={{width:"25px", marginRight:"5px"}} 
            title="You must have a Gravatar connected to your email to display your image"/>
          <Typography>Logout</Typography>
        </Button>
      </a> 
    )

    const  guestLinks = (
      <Link to="/register">
        <Button color="inherit"  style={{height:"55px", width:"110px",color:"black",backgroundColor: "#21b6ae"}} variant="contained">
          <Typography>Sign Up</Typography>
        </Button>
      </Link>
    )

    return (
      <div style={{
        flexGrow: 1,
      }}>
        <AppBar position="static" color="secondary">
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <Link to="/">
                <img src={Line2} width="250px" alt=""/>
              </Link>
            </IconButton>
            <Typography variant="h6" style={{
              flexGrow: 1,
            }}/>
            
            {isAuthenticated ? authLinks : guestLinks}
            
          
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}


Navbar.propTypes ={
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) =>({
  auth: state.auth
})


export default connect(mapStateToProps, {logoutUser})(Navbar)