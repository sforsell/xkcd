import React, { Component } from 'react';
import axios from 'axios'
import {Card} from './Card'



export class Feed extends Component {
  constructor(){
    super()
    this.createUser = this.createUser.bind(this);
    //this.handleClick = this.handleClick.bind(this);
    //this.toggleFavorite = this.toggleFavorite.bind(this);
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
      axios.get("/"+id+"/info.0.json")
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
          console.log(response.data)
          // this.setState(
          // {favorites: response.data}
      //);
    })
    } else {
      console.log("no user yet")
    }
  }

  setClassName(num) {
    if (this.state.favorites.includes(num)) { 
      console.log("setting active")
      return "active"
    } else {
      console.log("setting inactive")
      return "inactive"
    }  
  }

  // handleClick = event => {
  //   this.setState({
  //     userId: true
  //   });
  // };

  toggleFavorite(e){
    const userId = localStorage.getItem("xkcdUserId")
    const comicId = e.currentTarget.id
    //const comicId = this.props.data.id
    console.log(comicId)
    if ( userId === null) {
      this.createUser();
    }
  }

  getFavorites() {
    console.log("fetching favorites and adding them to state.")
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
    }).then(this.lookUpFavorites)
  }

  render(){
    var sortedComics = this.state.comics.sort(function(a,b) {
      return b.num-a.num
    })
    
    return (
      <div className="row">
        {sortedComics.map(comic => {
          const { num, date, title, alt, img }  = comic;
          return (
            <Card key={num} num={num} date={date} onFavoriteComic={this.toggleFavorite} title={title} alt={alt} img={img} activation={this.setClassName({num})} />
          )
        })}
        
      </div>
    )
  }
}