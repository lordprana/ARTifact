import React from 'react';
import { Text, View, Image } from 'react-native';
import { StackNavigator } from 'react-navigation';
import LoginScreen from './LoginScreen';
import fakeForum from './fakeForum';
import fakeMuseum from './fakeMuseum';
import swiper from './swiper';
import DisambiguatePicker from './DisambiguatePicker';
import Noneidentified from './NoneIdentified';
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
  DisambiguatePicker: {
    screen: DisambiguatePicker
  },
  NoneIdentified: {
    screen: Noneidentified
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

