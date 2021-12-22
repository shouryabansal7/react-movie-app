import React from "react";
import { data } from "../data";
import MovieCard from "./MovieCard";
import { addMovies, setShowFavourites } from "../action";

import Navbar from "./Navbar";
import { connect } from "react-redux";

class App extends React.Component {
  componentDidMount() {
    // const { store } = this.props;
    // console.log(store);
    // store.subscribe(() => {
    //   console.log("Updating");
    //   this.forceUpdate();
    // });
    //make an api call to get movies
    //then dispatch an action to add movies to store
    // store.dispatch(addMovies(data));

    // console.log("STATE", store.getState());
    this.props.dispatch(addMovies(data));
  }

  isMovieFavourite = (movie) => {
    const { movies } = this.props;

    const index = movies.favourites.indexOf(movie);
    if (index !== -1) {
      return true;
    }

    return false;
  };

  onChangeTab = (val) => {
    this.props.dispatch(setShowFavourites(val));
  };
  render() {
    //{movies:{}, search:{}}
    const { movies, search } = this.props;
    console.log("movies", movies);
    const { list, favourites, showFavourites } = movies;
    console.log("RENDER", this.props);

    const displayMovies = showFavourites ? favourites : list;

    return (
      <div className="App">
        <Navbar search={search} />
        <div className="main">
          <div className="tabs">
            <div
              className={`tab ${showFavourites ? "" : "active-tabs"}`}
              onClick={() => {
                this.onChangeTab(false);
              }}
            >
              Movies
            </div>
            <div
              className={`tab ${showFavourites ? "active-tabs" : ""}`}
              onClick={() => {
                this.onChangeTab(true);
              }}
            >
              Favourites
            </div>
          </div>
          <div className="list">
            {displayMovies.map((movie) => (
              <MovieCard
                movie={movie}
                key={movie.imdbID}
                dispatch={this.props.dispatch}
                isFavourite={this.isMovieFavourite(movie)}
              />
            ))}
          </div>
          {displayMovies.length === 0 ? (
            <div className="no-movies">No Movies to display</div>
          ) : null}
        </div>
      </div>
    );
  }
}

// class AppWrapper extends React.Component {
//   render() {
//     return (
//       <StoreContext.Consumer>
//         {(store) => <App store={store} />}
//       </StoreContext.Consumer>
//     );
//   }
// }

// export default AppWrapper;

function mapStateToProps(state) {
  return {
    movies: state.movies,
    search: state.search,
  };
}
const connectedComponent = connect(mapStateToProps)(App);
export default connectedComponent;
