import React, { Component } from 'react';
import axios from 'axios';
import {Thumbnail} from './Thumbnail';


export class Favorites extends Component {
  constructor(){
    super()
    this.state = {
      comics: []
    };
  }

  componentDidMount = () => {
  	const id = localStorage.getItem("xkcdUserId")
    if ( id !== null) {
      axios.get(`https://sforsell-xkcd-backend.herokuapp.com/users/${id}`)
        .then((response) => {
          this.setState({
          	comics: response.data
          })
        });
    }
  }


  render(){
    return (
      <div className="row">
        {this.props.numFav === 0 ? (
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