import {createStore, combineReducers, applyMiddleware} from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import Posts from './posts'
// import user from './user';

export const backEndAddress = 'http://25259523.ngrok.io'

const reducer = combineReducers({Posts});
// const middleware = composeWithDevTools(applyMiddleware(
//   thunkMiddleware,
//   createLogger({collapsed: true})
// ));
// const store = createStore(reducer, middleware);

// export default store;
// export * from './user';
