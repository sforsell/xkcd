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
    event.preventDefault();
    this.props.onSelectFavorites();
  }

  render(){
    return (
      <nav>
        <div className="nav-wrapper black">
          <a href="" className="brand-logo" onClick={this.handleHomeClick}> XKCD</a>
          <ul className="right">
            <li>
              <a href="" onClick={this.handleFavoritesClick}>
              <img src="./heart.png" alt="red heart" class="heart"/>
              <div class="btn-floating btn-small black-text valign-wrapper white smaller"> nn </div>
              </a>
            </li>  
          </ul>
        </div>
      </nav>
    )
  }
}
