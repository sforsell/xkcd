import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import {Header} from './Header';
import {Feed} from './Feed';
import {Favorites} from './Favorites';

class App extends Component {
  constructor(){
    super()
    this.state = {
      view: <Feed endPoint='/info.0.json' numFav={this.updateNumFavorites} />,
      numFavorites: 0,
      homeView: true
    };
  }

  updateNumFavorites = (n) => {
    this.setState({
      numFavorites: n
    });
  }

  selectHome = () => {
    this.setState({
      view: <Feed endPoint='/info.0.json' numFav={this.updateNumFavorites} />,
      homeView: true 
    });
  }

  selectFavorites = () => {
    this.setState({
      view: <Favorites numFav={this.state.numFavorites} />,
      homeView: false 
    });
  }

  componentDidMount = () => {
    const id = localStorage.getItem("xkcdUserId")
    if ( id !== null ) {
      axios.get(`http://localhost:3000/users/${id}`)
        .then((response) => {
          this.setState(prevState => ({
            numFavorites: response.data.length
          }))
        })
    }
  }  

  render() {
    return (
      <div className="App">
        <Header homeView={this.state.homeView} onSelectFavorites={this.selectFavorites} onSelectHome={this.selectHome}  numFav={this.state.numFavorites} />
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
