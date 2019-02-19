import React, { Component } from 'react';

export class Card extends Component {
  constructor(){
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick = event => {
    this.props.onFavoriteComic(event);
  }

  setClassName(num) {
    if (this.props.favorites.includes(num)) {
      return "active"
    } else {
      return "inactive"
    }  
  }

  render(){
    return (
      <div className="row">
        <div className="col s12 m6 offset-m3">
          <div className="card transparent">
            <div className="card-content">
              <h1 className="card-title">{this.props.title}</h1>
              <img src="./heart.png" id={this.props.num} onClick={this.handleClick} alt="red heart" className={`heart ${this.setClassName(this.props.num)}`} />
              <p className="description"> #{this.props.num} &#9679; {this.props.date} </p>
              <img className="responsive-img" src={this.props.img} alt={this.props.alt} />
              <p className="description"> {this.props.alt}</p>
            </div>
          </div>
        </div>  
      </div>
    )
  }
}
