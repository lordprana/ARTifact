import React from 'react'
import { Text, View } from 'react-native'
import styles from '../styles'
import LoginButton from './LoginButton'
import BackgroundImage from './BackgroundImage'
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { getUuidFromStorage, getUserInfo } from '../store/user'

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

class Auth extends React.Component {

  componentDidMount() {
    this.props.getUuidFromStorage()
    .then(result => {
      console.log('RESULT', result)
      if (result) this.props.getUserInfo()
    })
  }

  render() {
    if (!this.props.uuid) {
      return (<LoginScreen />)
    } else {
    return (
      this.props.navigation.dispatch(
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
      )
      // <View style={styles.container}>
      //   <Text>Welcome {this.props.name}</Text>
      //   <Image
      //     style={{width: 50, height: 50}}
      //     source={{uri: this.props.pictureUrl}}
      //     />
      // </View>
    )}
  }
}

const mapState = state => ({
  uuid: state.user.uuid,
  name: state.user.name,
  pictureUrl: state.user.pictureUrl
})
const mapDispatch = dispatch => ({
  // getFacebookIdFromStorage: () => dispatch(getFacebookIdFromStorage()),
  getUuidFromStorage: () => dispatch(getUuidFromStorage()),
  getUserInfo: () => dispatch(getUserInfo()),
})

export default connect(mapState, mapDispatch)(Auth)
