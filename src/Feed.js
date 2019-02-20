import React, { Component } from 'react';
import axios from 'axios';
import {Card} from './Card';



export class Feed extends Component {
  constructor(){
    super()
    //this.toggleFavorite = this.toggleFavorite.bind(this);
    //this.getFavorites = this.getFavorites.bind(this);
    this.state = {
      newest: null,
      currentMax: null,
      comics: [],
      favorites: [],
      error: false,
      hasMore: true,
      isLoading: false
    };

    window.onscroll = () => {
      const {
        getComics,
        state: {
          error,
          isLoading,
          hasMore,
        },
      } = this;

      if (error || isLoading || !hasMore) return;

      if (
      window.innerHeight + document.documentElement.scrollTop
      === document.documentElement.offsetHeight
      ) {
        getComics();
      }
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

  getComics = () => {
    this.setState({ isLoading: true }, () => {
      for (  var id = this.state.currentMax; id > this.state.currentMax - 10; id-- ) {
        axios.get(`/${id}/info.0.json`).then(response => {
          const nextComic = {
            num: `${response.data.num}`,
            date: this.prettyDate(`${response.data.day}`, `${response.data.month}`, `${response.data.year}`),
            title: `${response.data.title}`,
            alt: `${response.data.alt}`,
            img: `${response.data.img}`
          };

          this.setState(prevState => ({
            hasMore: this.state.comics.length < this.state.newest,
            isLoading: false,
            comics: [...prevState.comics, nextComic]
          }));
        })
      }
      this.setState(prevState => ({
        currentMax: prevState.currentMax - 10
      }))
    });    
  }

  getFavorites = () => {
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

  toggleFavorite = (e) => {
    const comicId = e.currentTarget.id
    let userId = localStorage.getItem("xkcdUserId")

    if ( userId === null) {
      this.createUser();
    }   

    if (this.state.favorites.includes(comicId)) {
      axios.delete(`http://localhost:3000/users/${userId}/comics/${comicId}`)
        .then((response) => {
          if (response.status=== 200) {
            const updatedFavorites = this.state.favorites.filter(comicNum => comicNum !== comicId.toString());
            this.setState(
              { favorites: updatedFavorites },
              this.props.numFav(this.state.favorites.length - 1)
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
          this.props.numFav(this.state.favorites.length + 1))
        }  
      });
    }
  }

  createUser() {
    axios.post('http://localhost:3000/users').then((response) => {
      if (response.status === 200) {
        localStorage.setItem("xkcdUserId", response.data.id);
      }
    })
  }

  componentDidMount(){
    axios.get(this.props.endPoint).then((response) => {
      this.setState({
        newest: response.data.num,
        currentMax: response.data.num
      },
      this.getComics
      );
    }).then(this.getFavorites)
  }

  render(){
    let sortedComics = this.state.comics.sort(function(a,b) {
      return b.num-a.num
    })
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