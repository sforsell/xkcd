import React, { Component } from 'react';

export class Card extends Component {
  constructor(){
    super()
    this.handleClick = this.handleClick.bind(this)
    this.state = {
      clicked:  false
    }
  }

  handleClick = event => {
    if (this.state.clicked) {
      this.setState({
        clicked: false
      })
    } else {
      this.setState({
        clicked: true
      })
    }
    this.props.onFavoriteComic(event);
  }

  style() {
    if (this.state.clicked) {
      return "active";
    }
    return {};
  }

  render(){
    return (
      <div className="row">
        <div className="col s12 m6 offset-m3">
          <div className="card transparent">
            <div className="card-content">
              <h1 className="card-title">{this.props.title}</h1>
              <img src="./heart.png" id={this.props.num} onClick={this.handleClick} alt="red heart" className={`heart ${this.props.activation} ${this.style()}`} />
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
