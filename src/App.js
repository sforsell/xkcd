import React, { Component } from 'react';
import './App.css';
import {Header} from './Header'
import {Feed} from './Feed'
//import {Favorites} from './Favorites'

class App extends Component {
  constructor(){
    super()
    this.selectHome = this.selectHome.bind(this);
    this.state = {view: <Feed endPoint='/info.0.json' />}
  }

  selectHome() {
    this.setState({view: <Feed endPoint='/info.0.json' />});
  }

  selectFavprites(){
   // this.setState({view: <Favorites />});
  }

  render() {
    return (
      <div className="App">
        <Header onSelectFavorites={this.selectFavorites} onSelectHome={ this.selectHome }/>
        <div id="main">
          <div className="container">
            {this.state.view}
          </div>  
        </div>
      </div>
    );
  }
}

export default App;
