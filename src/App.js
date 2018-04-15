import React, { Component } from 'react';

import logo from './logo.svg';
import './App.css';

import Header from "./components/header";
import Map from "./components/map";

class App extends Component {
  render() {
    require("dotenv").config();
    
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
          <Header />
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Map />
      </div>
    );
  }
}

export default App;
