import {createStore, combineReducers, applyMiddleware} from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';


const reducer = combineReducers({posts});

export const backEndAddress = 'http://7398c9df.ngrok.io'

// const middleware = composeWithDevTools(applyMiddleware(
//   thunkMiddleware,
//   createLogger({collapsed: true})
// ));
// const store = createStore(reducer, middleware);

// export default store;
// export * from './user';
