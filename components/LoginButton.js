import React from 'react'
import Expo from 'expo'
import { Button, Alert, AsyncStorage } from 'react-native'
import axios from 'axios'

// import styles from '../styles'

async function facebookLogin() {
  const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('2009994855934003', {
    permissions: ['public_profile', 'email'],
  });
  if (type === 'success') {
    axios.post('http://9844e2a9.ngrok.io/auth/facebook', { token })
    .then(res => res.data)
    .then(userInfo => {
      console.log(userInfo)
      AsyncStorage.setItem('uuid', userInfo.uuid)
      .catch(err => {
        Alert.alert('Error', err)
      })
    })
  } else {
    Alert.alert('Error', `Could not log in to Facebook`)
  }
}

const Login = () => {
  return (
      <Button
        raised
        onPress={facebookLogin}
        title="LOGIN WITH FACEBOOK" />
  )
}

export default Login
