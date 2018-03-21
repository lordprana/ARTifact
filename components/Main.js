import React from 'react';
import { Text, View, Image } from 'react-native';
import styles from '../styles';
import { StackNavigator } from 'react-navigation';
import LoginScreen from './LoginScreen';
import fakeForum from './fakeForum';
import fakeCamera from './fakeCamera';
const Stack = StackNavigator({
  LoginScreen: {
    screen: LoginScreen,
  },
  fakeCamera: {
    screen: fakeCamera
  },
  fakeForum: {
    screen: fakeForum,
  }
},
  {
    initialRouteName: 'LoginScreen'
  }
)
export default class App extends React.Component {
  render() {
    return <Stack />
  }
}

