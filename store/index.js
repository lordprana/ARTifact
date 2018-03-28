import {createStore, combineReducers, applyMiddleware} from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import posts from './posts';
import user from './user';
import piece from './piece';
import museum from './museum';

const reducer = combineReducers({ user, posts, piece, museum });
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  //createLogger({collapsed: true})
));
const store = createStore(reducer, middleware);

export default store;
// export * from './user';
export * from './piece';
export * from './posts';
export * from './museum';
