import React from 'react';
import { Text, View } from 'react-native';
import styles from '../styles';
import Permissions from './permissions.js'

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Permissions />
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
      </View>
    );
  }
}
