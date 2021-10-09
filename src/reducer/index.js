import {combineReducers} from 'redux';
import { ADD_MOVIES, ADD_FAVORITES, REMOVE_FAVOURITES, SET_SHOW_FAVOURITES } from "../action";

const initialMovieState = {
    list: [],
    favourites: [],
    showFavourites: false
}

const initialSearchState = {
    result:{}
}

const initialRootState={
    movies: initialMovieState,
    search: initialSearchState
}

export function movie(state=initialMovieState, action){
    console.log('MOVIES REDUCER');
    //we generally use switch case in react
    switch(action.type){
        case ADD_MOVIES:
            return {
                ...state,
                list: action.movies
            };
        case ADD_FAVORITES:
            return {
                ...state,
                favourites: [action.movie, ...state.favourites]
            }
        case REMOVE_FAVOURITES:
            const filteredArray = state.favourites.filter(
                movie=>movie.title!==action.movie.title
            );
            return{
                ...state,
                favourites: filteredArray
            }
        case SET_SHOW_FAVOURITES:
            return {
                ...state,
                showFavourites: action.val
            }
        default:
            return state;
    }
}

export function search (state= initialSearchState,action){
    console.log('SEARCH REDUCER');
    return state;
}

// export default function rootReducer(state=initialRootState,action){
//     return{
//         movies: movie(state.movies,action),
//         search: search(state.search,action)
//     }
// }

export default combineReducers({
    movies : movie,
    search : search
});