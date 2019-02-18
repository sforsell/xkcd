import React, { Component } from 'react';
import './App.css';
import {Header} from './Header'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <div id="main">
          hello!
        </div>
      </div>
    );
  }
}

export default App;
