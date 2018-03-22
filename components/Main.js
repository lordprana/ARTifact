import React from 'react';
import { Text, View, Image } from 'react-native';
import styles from '../styles';
<<<<<<< HEAD
import { StackNavigator } from 'react-navigation';
import LoginScreen from './LoginScreen';
import fakeForum from './fakeForum';
import swiper from './swiper';
const Stack = StackNavigator({
  LoginScreen: {
    screen: LoginScreen,
  },
  swiper: {
    screen: swiper
  },
  fakeForum: {
    screen: fakeForum,
=======
import { connect } from 'react-redux';
import { getFacebookIdFromStorage, getUuidFromStorage, getUserInfo } from '../store/user'

import LoginScreen from './LoginScreen'

class App extends React.Component {

  componentDidMount() {
    this.props.getUuidFromStorage()
    .then(result => {
      if (result) this.props.getUserInfo()
    })
>>>>>>> 45150b435611fee1a36d5e2f889ae1ad45a10cc7
  }
},
  {
    initialRouteName: 'LoginScreen',
    headerMode: 'none'
  }
)
export default class App extends React.Component {
  render() {
    return <Stack />
  }
}

<<<<<<< HEAD
=======
const mapState = state => ({
  uuid: state.user.uuid,
  name: state.user.name,
  pictureUrl: state.user.pictureUrl
})
const mapDispatch = dispatch => ({
  getFacebookIdFromStorage: () => dispatch(getFacebookIdFromStorage()),
  getUuidFromStorage: () => dispatch(getUuidFromStorage()),
  getUserInfo: () => dispatch(getUserInfo()),
})

export default connect(mapState, mapDispatch)(App)
>>>>>>> 45150b435611fee1a36d5e2f889ae1ad45a10cc7
