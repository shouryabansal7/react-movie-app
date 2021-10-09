import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';

import './index.css';
import App from './components/App';
import movies from './reducer'
import rootReducer from './reducer';

//function logger(obj, next,action)
//logger(obj)(next)(action);
//1st way to write
// const logger = function({ dispatch, getState }){
//   return function(next){
//     return function(action){
//       //middleware code
//       console.log('ACTION_TYPE = ',action.type);
//       next(action);
//     }
//   }
// }

//2nd way to write
const logger = ({dispatch, getState}) => (next) => (action) =>{
  //middleware code
  console.log('ACTION_TYPE = ',action.type);
  next(action);
}

const store  = createStore(rootReducer, applyMiddleware(logger));


console.log('store',store);
// console.log('Before STATE',store.getState());

// store.dispatch({
//   type: 'ADD_MOVIES',
//   movies: [{name: 'Superman'}]
// });

// console.log('After STATE',store.getState());

ReactDOM.render(
  <React.StrictMode>
    <App store={store}/>
  </React.StrictMode>,
  document.getElementById('root')
);

