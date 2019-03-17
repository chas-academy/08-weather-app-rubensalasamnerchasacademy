import React, { Component } from 'react';
import logo from './logo.svg';
import Weather from './components/weather';
import Navbar from './components/navbar';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App ">
        <Navbar></Navbar>
        <div className="container">
        <Weather></Weather>
        </div>
      </div>
    );
  }
}

export default App;
