import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import {Header} from './Header';
import {Feed} from './Feed';
import {Favorites} from './Favorites';

class App extends Component {
  constructor(){
    super()
    this.selectHome = this.selectHome.bind(this);
    this.selectFavorites = this.selectFavorites.bind(this)
    this.updateNumFavorites = this.updateNumFavorites.bind(this)
    this.state = {
      view: <Feed endPoint='/info.0.json' numFav={this.updateNumFavorites}/>,
      numFavorites: 0
    };
  }

  updateNumFavorites = (n) => {
    this.setState({
      numFavorites: n
    }, () => {
      console.log(this.state.numFavorites)
    });
  }

  selectHome() {
    this.setState({
      view: <Feed endPoint='/info.0.json' numFav={this.updateNumFavorites} />
    });
  }

  selectFavorites() {
    this.setState({
      view: <Favorites numFav={this.state.numFavorites} />
    });
  }

  componentDidMount() {
    const id = localStorage.getItem("xkcdUserId")
    if ( id !== null) {
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
        <Header onSelectFavorites={this.selectFavorites} onSelectHome={ this.selectHome } numFavorites={this.state.numFavorites} />
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
