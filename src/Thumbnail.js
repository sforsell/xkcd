import React, { Component } from 'react';
import {MediaBox} from 'react-materialize'

export class Thumbnail extends Component {

  render(){
    return(
      <div className="thumb col m3">
      	<h1> {this.props.title} </h1>
        <MediaBox src={this.props.img} className="responsive-img" width="650" alt="" />
      </div>
    )
  }
}