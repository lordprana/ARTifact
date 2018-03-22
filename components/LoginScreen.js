import React from 'react'
import { Text, View } from 'react-native'
import styles from '../styles'
import LoginButton from './LoginButton'
import BackgroundImage from './BackgroundImage'
import { connect } from 'react-redux';
// import { StackNavigator } from 'react-navigation';
import { getFacebookIdFromStorage, getUuidFromStorage, getUserInfo } from '../store/user'

const LoginScreen = () => {
  return (
    <BackgroundImage image={require('../londonMuseum.jpg')}>
      <View style={styles.container}>
        <Text style={styles.titleText}>Welcome to ARTifact</Text>
        <LoginButton />
      </View>
    </BackgroundImage>
  )
}

class Auth extends React.Component {
componentDidMount() {
  Promise.all([this.props.getFacebookIdFromStorage(), this.props.getUuidFromStorage()])
  .then(([facebookId, uuid]) => {
    if (facebookId) this.props.getUserInfo(facebookId)
  })
}

render() {
  if (!this.props.uuid) {
    return (<LoginScreen />)
  } else { //this.props.navigate. to swiper, initially fake cam
  return (
    // this.props.navigation.navigate('fakeCamera')
    <View style={styles.container}>
      <Text>Welcome {this.props.name}</Text>
      <Image
        style={{width: 50, height: 50}}
        source={{uri: this.props.pictureUrl}}
        />
    </View>
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
getUserInfo: facebookId => dispatch(getUserInfo(facebookId)),
})

export default connect(mapState, mapDispatch)(Auth)

// export default LoginScreen
