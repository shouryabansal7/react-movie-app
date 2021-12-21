import React from "react";
import { data } from "../data";
import MovieCard from "./MovieCard";
import { addMovies, setShowFavourites } from "../action";
import { StoreContext } from "..";
import NavbarWrapper from "./Navbar";

class App extends React.Component {
  componentDidMount() {
    const { store } = this.props;
    console.log(store);
    store.subscribe(() => {
      console.log("Updating");
      this.forceUpdate();
    });
    //make an api call to get movies
    //then dispatch an action to add movies to store
    store.dispatch(addMovies(data));

    console.log("STATE", store.getState());
  }

  isMovieFavourite = (movie) => {
    const { movies } = this.props.store.getState();
    const { favourites } = movies;
    const index = favourites.indexOf(movie);

    if (index !== -1) {
      //found the movie
      return true;
    }
    //not found the movie
    return false;
  };

  onChangeTab = (val) => {
    this.props.store.dispatch(setShowFavourites(val));
  };
  render() {
    //{movies:{}, search:{}}
    const { movies, search } = this.props.store.getState();
    const { list, favourites, showFavourites } = movies;
    console.log("RENDER", this.props.store.getState());

    const displayMovies = showFavourites ? favourites : list;

    return (
      <div className="App">
        <NavbarWrapper search={search} />
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
            {displayMovies.map((movie, index) => (
              <MovieCard
                movie={movie}
                key={`movies-${index}`}
                dispatch={this.props.store.dispatch}
                isFavourite={this.isMovieFavourite(movie)}
              />
            ))}
          </div>
          {displayMovies.length === 0 ? (
            <div className="no-movie">No Movies to display</div>
          ) : null}
        </div>
      </div>
    );
  }
}

class AppWrapper extends React.Component {
  render() {
    return (
      <StoreContext.Consumer>
        {(store) => <App store={store} />}
      </StoreContext.Consumer>
    );
  }
}

export default AppWrapper;
