import React from 'react';
import Main from './components/Main';
import Expo from 'expo';
import { Provider } from 'react-redux';
import store from './store';

export default class App extends React.Component {
  componentDidMount() {
    Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.PORTRAIT);
  }
  render() {
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    );
  }
}
