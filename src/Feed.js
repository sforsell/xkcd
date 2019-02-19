import React, { Component } from 'react';
import axios from 'axios';
import {Card} from './Card';



export class Feed extends Component {
  constructor(){
    super()
    this.createUser = this.createUser.bind(this);
    this.toggleFavorite = this.toggleFavorite.bind(this);
    this.lookUpFavorites = this.lookUpFavorites.bind(this);
    this.state = {
      newest: null,
      comics: [],
      favorites: []
    };
  }

  dateOrdinal(d) {
    return d+(31===d||21===d||1===d?"st":22===d||2===d?"nd":23===d||3===d?"rd":"th")
  };

  prettyDate(d, m, y) {
    const prettyMonth = new Date(m).toLocaleDateString("en-US", { month: 'long' });
    const prettyDay = this.dateOrdinal(d)
    const prettyDate = `${prettyMonth} ${prettyDay} ${y}`
    return prettyDate;
  }

  getComics(){
    for (  var id = this.state.newest; id > this.state.newest-20; id-- ) {
      axios.get(`/${id}/info.0.json`)
      .then(response => ({
          num: `${response.data.num}`,
          date: this.prettyDate(`${response.data.day}`, `${response.data.month}`, `${response.data.year}`),
          title: `${response.data.title}`,
          alt: `${response.data.alt}`,
          img: `${response.data.img}`
      })) 
      .then(comic => {
        this.setState(prevState => (
          {comics: [...prevState.comics, comic] })
      )})
    }  
  }

  lookUpFavorites() {
    const id = localStorage.getItem("xkcdUserId")
    if ( id !== null) {
      axios.get(`http://localhost:3000/users/${id}`)
        .then((response) => {
          for (var i = 0; i < response.data.length; i++) {
            this.setState(prevState => ({
              favorites: [...prevState.favorites, response.data[i].num.toString()]
            }))
          }
        })
    } else {
      console.log("no user yet")
    }
  }

  toggleFavorite(e){
    let userId = localStorage.getItem("xkcdUserId")
    let comicId = e.currentTarget.id

    if ( userId === null) {
      this.createUser();
      userId = localStorage.getItem("xkcdUserId")
    }

    if (this.state.favorites.includes(comicId)) {
      axios.delete(`http://localhost:3000/users/${userId}/comics/${comicId}`)
        .then((response) => {
          if (response.status=== 200) {
            const updatedFavorites = this.state.favorites.filter(comicNum => comicNum !== comicId.toString());
            this.setState(
              { favorites: updatedFavorites },
              this.props.numFav(this.state.favorites.length)
            )
          }
        })    
    } else {
      let newComic = this.state.comics.find(comic => comic.num === comicId)
      axios.post(`http://localhost:3000/users/${userId}/comics`,
        {
          num: comicId,
          title: newComic.title,
          img: newComic.img
        }
      ).then((response) => {
        if (response.status=== 200) {
          this.setState(prevState => (
            { favorites: [...prevState.favorites, comicId] }
          ), 
          this.props.numFav(this.state.favorites.length))
        }  
      });
    }
  }

  createUser() {
    axios.post('http://localhost:3000/users')
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem("xkcdUserId", response.data.id);
        }
      })
  }

  componentDidMount(){
    axios.get(this.props.endPoint)
    .then((response) => {
      this.setState(
        {newest: response.data.num},
        this.getComics
      );
    })
    .then(this.lookUpFavorites)
  }

  render(){
    let sortedComics = this.state.comics.sort(function(a,b) {
      return b.num-a.num
    })
    //let favorites = this.state.favorites ? this.state.favorites : [];
    return (
      <div className="row">
        {sortedComics.map( (comic, i) => {
          const { num, date, title, alt, img }  = comic;
          return (
            <Card key={i} num={num} date={date} onFavoriteComic={this.toggleFavorite} title={title} alt={alt} img={img} favorites={this.state.favorites} />
          )
        })}
        
      </div>
    )
  }
}