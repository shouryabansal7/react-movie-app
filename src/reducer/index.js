import { combineReducers } from "redux";
import {
  ADD_MOVIES,
  ADD_FAVORITES,
  REMOVE_FAVOURITES,
  SET_SHOW_FAVOURITES,
  ADD_MOVIE_TO_LIST,
  ADD_SEARCH_RESULT,
} from "../action";

const initialMovieState = {
  list: [],
  favourites: [],
  showFavourites: false,
};

const initialSearchState = {
  result: {},
  showSearchResults: false,
};

// const initialRootState = {
//   movies: initialMovieState,
//   search: initialSearchState,
// };

export function movie(state = initialMovieState, action) {
  console.log("MOVIES REDUCER");
  //we generally use switch case in react
  switch (action.type) {
    case ADD_MOVIES:
      return {
        ...state,
        list: action.movies,
      };
    case ADD_FAVORITES:
      return {
        ...state,
        favourites: [action.movie, ...state.favourites],
      };
    case REMOVE_FAVOURITES:
      const filteredArray = state.favourites.filter(
        (movie) => movie.title !== action.movie.title
      );
      return {
        ...state,
        favourites: filteredArray,
      };
    case SET_SHOW_FAVOURITES:
      return {
        ...state,
        showFavourites: action.val,
      };
    case ADD_MOVIE_TO_LIST:
      return {
        ...state,
        list: [action.movie, ...state.list],
      };
    default:
      return state;
  }
}

export function search(state = initialSearchState, action) {
  console.log("SEARCH REDUCER");
  switch (action.type) {
    case ADD_SEARCH_RESULT:
      return {
        ...state,
        results: action.movie,
        showSearchResults: true,
      };
    case ADD_MOVIE_TO_LIST:
      return {
        ...state,
        showSearchResults: false,
      };
    default:
      return state;
  }
}

// export default function rootReducer(state=initialRootState,action){
//     return{
//         movies: movie(state.movies,action),
//         search: search(state.search,action)
//     }
// }

export default combineReducers({
  movies: movie,
  search: search,
});
