import React from 'react';
import {data} from '../data';
import Navbar from './Navbar';
import MovieCard from './MovieCard';
import {addMovies} from '../action';

class App extends React.Component {
  componentDidMount(){
    const {store} = this.props;
    store.subscribe(()=>{
      console.log('Updating');
      this.forceUpdate();
    });
    //make an api call to get movies
    //then dispatch an action to add movies to store
    store.dispatch(addMovies(data));

    console.log('STATE',store.getState());
  }
  render(){
    const movies = this.props.store.getState();
    console.log('RENDER');
    return (
      <div className="App">
        <Navbar />
        <div className="main">
          <div className="tabs">
            <div className="tab">Movies</div>
            <div className="tab">Favourites</div>
          </div>
          <div className="list">
            {movies.map((movie,index) =>(
              <MovieCard movie={movie} key={index}/>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
