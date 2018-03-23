import React from 'react';
import { Text, View, Image } from 'react-native';
import styles from '../styles';
import { connect } from 'react-redux';
import { getFacebookIdFromStorage, getUuidFromStorage, getUserInfo } from '../store/user'

import LoginScreen from './LoginScreen'
import MuseumPage from './MuseumPage'

class App extends React.Component {

  componentDidMount() {
    this.props.getUuidFromStorage()
    .then(result => {
      if (result) this.props.getUserInfo()
    })
  }

  render() {
    if (!this.props.uuid) {
      return (<LoginScreen />)
    } else {
    return (
      <MuseumPage />
    )}
  }
}

const mapState = state => ({
  uuid: state.user.uuid,
  name: state.user.name,
  pictureUrl: state.user.pictureUrl
})
const mapDispatch = dispatch => ({
  getFacebookIdFromStorage: () => dispatch(getFacebookIdFromStorage()),
  getUuidFromStorage: () => dispatch(getUuidFromStorage()),
  getUserInfo: () => dispatch(getUserInfo()),
})

export default connect(mapState, mapDispatch)(App)
