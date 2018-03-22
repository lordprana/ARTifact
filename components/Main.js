import React from 'react';
import { Text, View, Image } from 'react-native';
import styles from '../styles';
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

