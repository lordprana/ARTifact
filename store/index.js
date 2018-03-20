import {createStore, combineReducers, applyMiddleware} from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import posts from './posts';
import user from './user';
// import user from './user';

export const backEndAddress = 'http://9844e2a9.ngrok.io';

const reducer = combineReducers({ user, posts });
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
));
const store = createStore(reducer, middleware);

export default store;
// export * from './user';
