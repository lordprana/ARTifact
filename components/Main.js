import React from 'react';
import { Text, View } from 'react-native';
import styles from '../styles';
import { connect } from 'react-redux';
import { getFacebookIdFromStorage, getUuidFromStorage, getUserInfo } from '../store/user'

class App extends React.Component {

  componentDidMount() {
    this.props.getFacebookIdFromStorage()
    this.props.getUuidFromStorage()
    .then(() => {
      this.props.getUserInfo()
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
      </View>
    );
  }
}
// if not logged in, show login screen
const mapDispatch = dispatch => ({
  getFacebookIdFromStorage: () => dispatch(getFacebookIdFromStorage()),
  getUuidFromStorage: () => dispatch(getUuidFromStorage()),
  getUserInfo: () => dispatch(getUserInfo()),
})

export default connect(null, mapDispatch)(App)
