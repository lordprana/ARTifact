import React from 'react';
import { Text, View } from 'react-native';
import styles from '../styles';
import { connect } from 'react-redux';
import { getFacebookIdFromStorage, getUuidFromStorage, getUserInfo } from '../store/user'

import LoginScreen from './LoginScreen'

class App extends React.Component {

  componentDidMount() {
    this.props.getFacebookIdFromStorage()
    this.props.getUuidFromStorage()
    // .then(() => {
    //   this.props.getUserInfo()
    // })
  }

  render() {
    if (!this.props.uuid) {
      return (<LoginScreen />)
    } else {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
      </View>
    )}
  }
}

const mapState = state => ({
  uuid: state.user.uuid,
})
const mapDispatch = dispatch => ({
  getFacebookIdFromStorage: () => dispatch(getFacebookIdFromStorage()),
  getUuidFromStorage: () => dispatch(getUuidFromStorage()),
  getUserInfo: () => dispatch(getUserInfo()),
})

export default connect(mapState, mapDispatch)(App)
