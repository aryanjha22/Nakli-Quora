import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import Navbar from '../src/components/layout/Navbar'
import Landing from '../src/components/layout/Landing'
import Register from './components/register/Register'


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar/>
        <Route exact path="/" component = {Landing}/> 
        <div className="container">
          <Route exact path="/register" component={Register}/>
        </div>
      </div>
    </Router>
  );
}

export default App;
 