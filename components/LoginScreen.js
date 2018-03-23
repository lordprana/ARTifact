import React from 'react'
import { Text, View, Image } from 'react-native'
import { Permissions, Location } from 'expo';
import styles from '../styles'
import LoginButton from './LoginButton'
import BackgroundImage from './BackgroundImage'
import { connect } from 'react-redux';
// import { StackNavigator } from 'react-navigation';
import { getUuidFromStorage, getUserInfo } from '../store/user';
import myImage from '../londonMuseum.jpg';
//black screen //fade by opacity
const LoginScreen = (props) => {
  return (
    <BackgroundImage image={myImage}>
      <View style={styles.container}>
        <Text style={styles.titleText}>Welcome to ARTifact</Text>
        {
          props.renderLoginButton && <LoginButton />
        }
      </View>
    </BackgroundImage>
  )
}

class Auth extends React.Component {
  constructor() {
    super()
    this.state = {
      loading: false,
      hasLocationPermission: null
    }
    this.getLocation = this.getLocation.bind(this)
  }

  // componentDidMount() {
  //     this.setState({loading: true})
  //     this.props.getUuidFromStorage()
  //     .then(result => {
  //       this.setState({loading: false})
  //       if (result) {
  //         this.props.getUserInfo()
  //         .then(
  //            this.props.navigation.navigate('swiper')
  //         )
  //       }
  //     })
  //   }
  componentWillMount() {
    // this.props.getUuidFromStorage()
    // .then(result => {
    //   if (result) {
    //     this.props.getUserInfo()
    //     this.props.navigation.navigate('swiper')
    //   }
    // })
    this.setState({ loading: true })
    this.getLocation()
      .then(result => {
        console.log(result)
        this.props.getUuidFromStorage()
          .then(result => {
            this.setState({ loading: false })
            if (result) {
              this.props.getUserInfo()
                .then(
                  this.props.navigation.navigate('swiper')
                )
            }
          })
        }
      )
  }
  async getLocation() {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    this.setState({ hasLocationPermission: status === 'granted' });
    return Location.getCurrentPositionAsync({ enableHighAccuracy: true });
  }
  render() {
    return (
      this.props.loading
        ? <LoginScreen renderLoginButton={false} />
        : !this.props.uuid
          ? <LoginScreen renderLoginButton={true} />
          : <LoginScreen renderLoginButton={false} />
      // <View style={styles.container}>
      //   <Text>Welcome {this.props.name}</Text>
      //   <Image
      //     style={{width: 50, height: 50}}
      //     source={{uri: this.props.pictureUrl}}
      //     />
      // </View>
    )
  }

  // render() {
  //  return (<LoginScreen />)
  // }
}
const mapState = state => ({
  uuid: state.user.uuid,
  name: state.user.name,
  pictureUrl: state.user.pictureUrl
})
const mapDispatch = dispatch => ({
  getUuidFromStorage: () => dispatch(getUuidFromStorage()),
  getUserInfo: () => dispatch(getUserInfo()),
})

export default connect(mapState, mapDispatch)(Auth)

// export default LoginScreen

