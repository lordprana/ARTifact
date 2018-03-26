import React from 'react';
import Expo from 'expo';
import { NavigationActions } from 'react-navigation';
import { Button, Alert } from 'react-native';
import { connect } from 'react-redux';
import { loginWithToken } from '../store/user';
import { appId } from '../config';

const LoginButton = props => {

  async function facebookLogin() {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(appId, {
      permissions: ['public_profile', 'email'],
    });
    if (type === 'success') {
      props.loginWithToken(token);
      props.navigation.dispatch(
        NavigationActions.reset(
          {
            index: 0,
            actions: [
              NavigationActions.navigate(
                {
                  routeName: 'swiper'
                }
              )
            ]
          })
      );
    } else {
      Alert.alert('Error', `Could not log in to Facebook`);
    }
  }

  return (
      <Button
        raised
        onPress={facebookLogin}
        title="LOGIN WITH FACEBOOK" />
  );
};

const mapDispatch = dispatch => ({
  loginWithToken: token => dispatch(loginWithToken(token)),
});

export default connect(null, mapDispatch)(LoginButton);
