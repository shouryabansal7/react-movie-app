import { ADD_MOVIES, ADD_FAVORITES } from "../action";

const initialMovieState = {
    list: [],
    favourites: []
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
        default:
            return state;
    }
}
