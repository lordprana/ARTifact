/* eslint-disable class-methods-use-this */

import React from 'react'
import Expo from 'expo'
import { Button, Alert } from 'react-native'
import axios from 'axios'

// import styles from '../styles'

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
      axios.post('http://b751f49c.ngrok.io/auth/facebook', { token })
      .then(res => res.data)
      .then(info => console.log(info))
    }
  }
  render() {
    console.log('console test')
    return (
        <Button
          raised
          onPress={this.login}
          title="LOGIN WITH FACEBOOK" />
    );
  }
}
