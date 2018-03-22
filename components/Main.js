import React from 'react';
import { Text, View, Image } from 'react-native';
import { StackNavigator } from 'react-navigation';
import LoginScreen from './LoginScreen';
import fakeForum from './fakeForum';
import fakeMuseum from './fakeMuseum';
import swiper from './swiper';
// remove stacknavigator museum screen.
const Stack = StackNavigator({
  LoginScreen: {
    screen: LoginScreen,
  },
  swiper: {
    screen: swiper
  },
  fakeForum: {
    screen: fakeForum
  },
  fakeMuseum: {
    screen: fakeMuseum
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

