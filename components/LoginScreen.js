import React from 'react'
import { Text, View } from 'react-native'
import styles from '../styles'
import LoginButton from './LoginButton'

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Welcome to ARTifact</Text>
      <LoginButton />
    </View>
  )
}

export default LoginScreen
