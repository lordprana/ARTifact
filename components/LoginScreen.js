import React from 'react';
import { Text, View, Image } from 'react-native';
import { Permissions, Location } from 'expo';
import styles from '../styles';
import LoginButton from './LoginButton';
import BackgroundImage from './BackgroundImage';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { getUuidFromStorage, getUserInfo } from '../store/user';

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
      loading: true,
      hasLocationPermission: null
    };
    this.getLocation = this.getLocation.bind(this);
  }

  componentWillMount() {
    this.props.getUuidFromStorage()
      .then(result => {
        this.setState({ loading: false });
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
            }
            );
        }
      });
  }
  async getLocation() {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    this.setState({ hasLocationPermission: status === 'granted' });
    // return Location.getCurrentPositionAsync({ enableHighAccuracy: true });
  }
  render() {
    return (
      this.state.loading
        ? <LoginScreen renderLoginButton={false} />
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
});

export default connect(mapState, mapDispatch)(Auth);
