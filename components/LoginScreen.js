import React from 'react';
import { Text, View } from 'react-native';
import styles from '../styles';
import LoginButton from './LoginButton';
import BackgroundImage from './BackgroundImage';

const LoginScreen = () => {
  return (
    <BackgroundImage image={require('../londonMuseum.jpg')}>
      <View style={styles.container}>
        <Text style={styles.titleText}>Welcome to ARTifact</Text>
        <LoginButton />
      </View>
    </BackgroundImage>
  );
};

export default LoginScreen;
