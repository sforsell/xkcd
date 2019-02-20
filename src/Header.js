import React, { Component } from 'react';

export class Header extends Component {

  handleHomeClick = (event) => {
    this.props.onSelectHome();
  }

  handleFavoritesClick = (event) => {
    this.props.onSelectFavorites();
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
