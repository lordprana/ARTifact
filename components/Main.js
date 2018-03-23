import React from 'react';
import { Text, View, Image } from 'react-native';
import styles from '../styles';
import { connect } from 'react-redux';
import { getFacebookIdFromStorage, getUuidFromStorage, getUserInfo } from '../store/user';

import LoginScreen from './LoginScreen';

class App extends React.Component {

  componentDidMount() {
    this.props.getUuidFromStorage()
    .then(result => {
      if (result) this.props.getUserInfo();
    });
  }

  render() {
    if (!this.props.uuid) {
      return (<LoginScreen />);
    } else {
    return (
      <View style={styles.container}>
        <Text>Welcome {this.props.name}</Text>
        <Image
          style={{width: 50, height: 50}}
          source={{uri: this.props.pictureUrl}}
          />
      </View>
    );}
  }
}

const mapState = state => ({
  uuid: state.user.uuid,
  name: state.user.name,
  pictureUrl: state.user.pictureUrl
});
const mapDispatch = dispatch => ({
  getFacebookIdFromStorage: () => dispatch(getFacebookIdFromStorage()),
  getUuidFromStorage: () => dispatch(getUuidFromStorage()),
  getUserInfo: () => dispatch(getUserInfo()),
});

export default connect(mapState, mapDispatch)(App);
