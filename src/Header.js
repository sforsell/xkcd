import React, { Component } from 'react';

export class Header extends Component {
  constructor(){
    super()
    this.handleHomeClick = this.handleHomeClick.bind(this)
    this.handleFavoritesClick = this.handleFavoritesClick.bind(this)
  }

  handleHomeClick(event) {
    event.preventDefault();
    this.props.onSelectHome();
  }

  handleFavoritesClick(event){
    this.props.onSelectFavorites();
  }

  componentDidUpdate(prevProps) {
    if (this.props.numFav !== prevProps.numFav) {
      return this.props.numFav;
    }
  }

  render(){
    return (
      <nav>
        <div className="nav-wrapper black">
          {!this.props.homeView &&
            <ul className="left">
              <li className="back-arrow" onClick={this.handleHomeClick}> &#60; </li>
            </ul>
          }
          <h2 className="brand-logo" onClick={this.handleHomeClick}> XKCD</h2>
          <ul className="right">
            <li>
              <div onClick={this.handleFavoritesClick}>
                <img src="./heart.png" alt="red heart" className="navheart"/>
                <div className="btn-floating btn-small black-text valign-wrapper white smaller"> {this.props.numFav} </div>
              </div>
            </li>  
          </ul>
        </div>
      </nav>
    )
  }
}
