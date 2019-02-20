import React, { Component } from 'react';
import axios from 'axios';
import {Thumbnail} from './Thumbnail';


export class Favorites extends Component {
  constructor(){
    super()
    this.state = {
      comics: [],
      numfavorites: 0
    };
  }

  componentDidMount() {
  	const id = localStorage.getItem("xkcdUserId")
    if ( id !== null) {
      axios.get(`http://localhost:3000/users/${id}`)
        .then((response) => {
          this.setState({
          	numfavorites: this.props.numFav,
          	comics: response.data
          })
        });
    }
  }

  render(){
    return (
      <div className="row">
        {this.state.numfavorites === 0 ? (
          <div>	
            <h1> No Favorites, Yet... </h1>
            <p> Click on the heart of a comic and it will be added here </p>
          </div>
        ) : (
          this.state.comics.map((comic, i) => {
            return ( <Thumbnail key={i} title={comic.title} img={comic.img_url} /> )
      	  })
        )}
      </div>
    )
  }
}