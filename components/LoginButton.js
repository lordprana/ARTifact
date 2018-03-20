import React from 'react'
import Expo from 'expo'
import { Button, Alert } from 'react-native'
import axios from 'axios'
import { connect } from 'react-redux'
import { setUuid, setFacebookId, stockUserInfo, getFacebookIdFromStorage } from '../store/user'

// import styles from '../styles'

const LoginButton = props => {

  async function facebookLogin() {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('2009994855934003', {
      permissions: ['public_profile', 'email'],
    });
    if (type === 'success') {
      axios.post('http://9844e2a9.ngrok.io/auth/facebook', { token })
      .then(res => res.data)
      .then(user => {
        console.log('about to dispatch some functions with:', user)
        props.setUuid(user.uuid)
        props.setFacebookId(user.facebookId)
        props.setUserInfo(user)
        // .catch(err => {
        //   Alert.alert('Error', err)
        // })
      })
    } else {
      Alert.alert('Error', `Could not log in to Facebook`)
    }
  }

  return (
      <Button
        raised
        onPress={facebookLogin}
        title="LOGIN WITH FACEBOOK" />
  )
}

const mapDispatch = dispatch => ({
  setUuid: uuid => dispatch(setUuid(uuid)),
  setFacebookId: facebookId => dispatch(setFacebookId(facebookId)),
  setUserInfo: info => dispatch(stockUserInfo(info)),
  getFacebookIdFromStorage: () => dispatch(getFacebookIdFromStorage())
})

export default connect(null, mapDispatch)(LoginButton)
