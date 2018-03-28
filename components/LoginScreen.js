import React from 'react';
import { Text, View, Image } from 'react-native';
import { Permissions, Location, AppLoading, Asset } from 'expo';
import styles from '../styles';
import LoginButton from './LoginButton';
import BackgroundImage from './BackgroundImage';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { getUuidFromStorage, getUserInfo } from '../store/user';
import { getMuseumNearMe } from '../store/museum';
// import { backEndAddress } from '../config';
// import axios from 'axios';

const LoginScreen = (props) => {
  return (
    <BackgroundImage image={require('../londonMuseum.jpg')}>
      <View style={styles.container}>
        <Text style={styles.titleText}>Welcome to ARTifact</Text>
        {
          props.renderLoginButton && <LoginButton navigation={props.navigation} />
        }
      </View>
    </BackgroundImage>
  );
};

class Auth extends React.Component {
  constructor() {
    super();
    this.state = {
      loadingImage: true,
      loadingUUID: true,
      hasLocationPermission: null
    };
    this.getLocation = this.getLocation.bind(this);
  }

  componentDidMount() {
    this.getLocation()
      .then(result => {
        this.props.getUuidFromStorage()
          .then(result => {
            this.setState({loadingUUID: false});
            if (result) {
              this.props.getUserInfo()
                .then(result => {
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
                  );
                });
            }
          });
      })
  }
  async getLocation() {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    this.setState({ hasLocationPermission: status === 'granted' });
    return Location.getCurrentPositionAsync({ enableHighAccuracy: true })
      .then(result => {
        const latitude = result.coords.latitude;
        const longitude = result.coords.longitude;
        return this.props.getMuseumNearMe(latitude, longitude)
      })
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('../londonMuseum.jpg'),
      ])
    ]);
  }

  _handleLoadingError = error => {
    console.error(error);
  };

  _handleFinishLoading = () => {
    this.setState({ loadingImage: false });
  };

  render() {
    return (
      this.state.loadingImage || this.state.loadingUUID
        ? <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
        : !this.props.uuid
          ? <LoginScreen
            renderLoginButton={true}
            navigation={this.props.navigation} />
          : <LoginScreen renderLoginButton={false} />
    );
  }
}
const mapState = state => ({
  uuid: state.user.uuid,
  name: state.user.name,
  pictureUrl: state.user.pictureUrl
});
const mapDispatch = dispatch => ({
  getUuidFromStorage: () => dispatch(getUuidFromStorage()),
  getUserInfo: () => dispatch(getUserInfo()),
  getMuseumNearMe: (latitude, longitude) => dispatch(getMuseumNearMe(latitude, longitude))
});

export default connect(mapState, mapDispatch)(Auth);
