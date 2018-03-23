import React from 'react';
import { Text, View } from 'react-native';
import styles from '../styles';
export default class FakeMuseum extends React.Component {
  render() {
    console.log("ARE WE HERE")
    return (
      <View style = {styles.container}>
        <Text>THIS IS THE FAKE MUSEUM</Text>
      </View>
    )
  }
}
