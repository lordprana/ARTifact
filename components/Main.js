import React from 'react';
import { Text, View, Image } from 'react-native';
import { StackNavigator } from 'react-navigation';
import LoginScreen from './LoginScreen';
import swiper from './swiper';
import DisambiguatePicker from './DisambiguatePicker';
import Noneidentified from './NoneIdentified';
import LoadingScreen from './LoadingScreen';
import AllPosts from './AllPosts';
// remove stacknavigator museum screen.
const Stack = StackNavigator({
  LoginScreen: {
    screen: LoginScreen,
  },
  swiper: {
    screen: swiper
  },
  DisambiguatePicker: {
    screen: DisambiguatePicker
  },
  NoneIdentified: {
    screen: Noneidentified
  },
  LoadingScreen: {
    screen: LoadingScreen
  },
  AllPosts: {
    screen: AllPosts
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

// const styles = StyleSheet.create({
//   view: {
//     backgroundColor: 'cornsilk',
//     paddingTop: 10
//   }
// })
