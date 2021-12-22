import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { Provider } from "react-redux";
import "./index.css";

import rootReducer from "./reducer";

import AppWrapper from "./components/App";

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
const logger =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    //middleware code
    if (typeof action !== "function") {
      console.log("ACTION_TYPE = ", action.type);
    }
    next(action);
  };

// const thunk = ({dispatch, getState}) => (next) => (action) =>{
//   if(typeof action === 'function'){
//     action(dispatch);
//     return;
//   }
//   next(action);
// }

const store = createStore(rootReducer, applyMiddleware(logger, thunk));

console.log("store", store);
// export const StoreContext = createContext();

// console.log("StoreContext", StoreContext);

// class Provider extends React.Component {
//   render() {
//     const { store } = this.props;
//     return (
//       <StoreContext.Provider value={store}>
//         {this.props.children}
//       </StoreContext.Provider>
//     );
//   }
// }

// const connectedComponent = connect(callback)(App);
// export function connect(callback) {
//   return function (Component) {
//     class ConnectedComponent extends React.Component {
//       constructor(props) {
//         super(props);
//         this.unsubscribe = this.props.store.subscribe(() => {
//           this.forceUpdate();
//         });
//       }

//       componentWillUnmount() {
//         this.unsubscribe();
//       }
//       render() {
//         const { store } = this.props;
//         const state = store.getState();
//         const dataToBeSentAsProps = callback(state);

//         return <Component dispatch={store.dispatch} {...dataToBeSentAsProps} />;
//       }
//     }

//     class ConnectedComponentWrapper extends React.Component {
//       render() {
//         return (
//           <StoreContext.Consumer>
//             {(store) => {
//               return <ConnectedComponent store={store} />;
//             }}
//           </StoreContext.Consumer>
//         );
//       }
//     }
//     return ConnectedComponentWrapper;
//   };
// }

// console.log('Before STATE',store.getState());

// store.dispatch({
//   type: 'ADD_MOVIES',
//   movies: [{name: 'Superman'}]
// });

// console.log('After STATE',store.getState());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppWrapper />
    </Provider>
    ,
  </React.StrictMode>,
  document.getElementById("root")
);
