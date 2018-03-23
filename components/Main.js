import React from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
// import styles from '../styles';
import CreatePost from './CreatePost'
import AllPosts from './AllPosts';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.view}>
      <ScrollView>
        <CreatePost/>
        <AllPosts/>
      </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    backgroundColor: 'cornsilk',
    paddingTop: 10
  }
})
