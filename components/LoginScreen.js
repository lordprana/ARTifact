import React from 'react'
import { Text, View, Image } from 'react-native'
import axios from 'axios';
import styles from '../styles'
import LoginButton from './LoginButton'
import BackgroundImage from './BackgroundImage'
import { connect } from 'react-redux';
import { backEndAddress } from '../config';
import { Permissions, Location } from 'expo';
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
    // Location.getCurrentPositionAsync({ enableHighAccuracy: true })
    // .then(result => console.log(result));
    return Location.getCurrentPositionAsync({ enableHighAccuracy: true })
    .then(result => {
      console.log("WE ARE HERE")
      axios.get(`${backEndAddress}/api/museums/location`, {
        params: {
          latitude: result.coords.latitude,
          longitude: result.coords.longitude
        }
      })
      .then(res => {
        console.log("THIS IS THE ID:", res.data)
        return res.data
      })
    })
    ///^^ move this to OCR component to get museumID.
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
  latitude: state.user.latitude,
  longitude: state.user.longitude,
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

