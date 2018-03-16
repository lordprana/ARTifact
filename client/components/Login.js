/* eslint-disable class-methods-use-this */

import React from 'react'
import Expo from 'expo'
import { Button, Alert } from 'react-native'

import styles from '../styles'

export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.login = this.login.bind(this)
  }

  async login() {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('2009994855934003', {
      permissions: ['public_profile', 'email'],
    });
    if (type === 'success') {
      // Get the user's name using Facebook's Graph API
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}`)
      Alert.alert(
        'Logged in!',
        `Hi ${(await response.json()).name}!`,
      );
    }
  }
  render() {
    console.log('console test')
    return (
        <Button
          raised
          onPress={this.login}
          icon={{ name: 'cached' }}
          title="LOGIN WITH FACEBOOK" />
    );
  }
}
