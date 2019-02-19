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
          <h2 className="brand-logo" onClick={this.handleHomeClick}> XKCD</h2>
          <ul className="right">
            <li>
              <div onClick={this.handleFavoritesClick}>
                <img src="./heart.png" alt="red heart" className="navheart"/>
                <div className="btn-floating btn-small black-text valign-wrapper white smaller"> {this.props.numFavorites} </div>
              </div>
            </li>  
          </ul>
        </div>
      </nav>
    )
  }
}
