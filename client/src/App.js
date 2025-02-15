import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import jwt_decode from 'jwt-decode'
import setAuthToken from './utils/setAuthToken'
import {logoutUser, setCurrentUser} from './actions/authActions'
import {clearCurrentProfile} from './actions/profileActions'


import {Provider} from 'react-redux'
import store from './store'

import PrivateRoute from './components/PrivateRoute'

import Navbar from '../src/components/layout/Navbar'
import Landing from '../src/components/layout/Landing'
import Register from './components/register/Register'
import Dashboard from './components/dashboard/Dashboard'
import CreateProfile from './components/create-profile/CreateProfile'
import EditProfile from './components/edit-profile/EditProfile'


//checks for token
if(localStorage.jwtToken){
  //Set Auth Token header auth
  setAuthToken(localStorage.jwtToken)
  //Decode token to check info
  const decoded = jwt_decode(localStorage.jwtToken)
  //Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded))

  //check for expired token
  const currentTime = Date.now() / 1000
  if(decoded.exp < currentTime){
    //Logout User
    store.dispatch(logoutUser())
    //Clear current Profile
    store.dispatch(clearCurrentProfile())
    //Redirect to Login
    window.location.href = '/'
  }
}

function App() {
  return (
    <Provider store = {store}>
      <Router>
        <div className="App">
          <Navbar/>
          <Route exact path="/" component = {Landing}/> 
          <div className="container">
            <Route exact path="/register" component={Register}/>
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard}/>
            </Switch>
            <Switch>
              <PrivateRoute exact path="/create-profile" component={CreateProfile}/>
            </Switch>
            <Switch>
              <PrivateRoute exact path="/edit-profile" component={EditProfile}/>
            </Switch>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
 