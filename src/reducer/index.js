import { ADD_MOVIES, ADD_FAVORITES, REMOVE_FAVOURITES, SET_SHOW_FAVOURITES } from "../action";

const initialMovieState = {
    list: [],
    favourites: [],
    showFavourites: false
}

export default function movie(state=initialMovieState, action){
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
