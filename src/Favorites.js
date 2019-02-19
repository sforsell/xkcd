import React, { Component } from 'react';
import axios from 'axios';
//import {Thumbnail} from './Thumbnail';


export class Favorites extends Component {
  constructor(){
    super()
    this.state = {
      comics: [],
      numfavorites: this.props.numfavorites
    };
  }

  componentDidMount() {
  	const id = localStorage.getItem("xkcdUserId")
    if ( id !== null) {
      axios.get(`http://localhost:3000/users/${id}`)
        .then((response) => {
        	console.log(response.data)
          // this.setState({
          //   comics: response.data
          // })
        });
    }
  }

  render(){
    return (
      <div className="row">
        
      </div>
    )
  }
}