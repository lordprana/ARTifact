import React from 'react';
import { Text, View } from 'react-native';
import styles from '../styles';
export default class FakeMuseum extends React.Component {
  render() {
    return (
      <View style = {styles.container}>
        <Text>THIS IS THE FAKE MUSEUM</Text>
      </View>
    )
  }
}
