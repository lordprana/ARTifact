import React from 'react';

import { Text, View, TouchableOpacity, Image } from 'react-native';
import { Camera, Permissions, ImageManipulator } from 'expo';
import axios from 'axios';
// import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import styles from '../styles';
import { backEndAddress } from '../config';
// import { stockPiece, getPosts } from '../store';
// import LoadingScreen from './LoadingScreen';
// import DisambiguatePicker from './DisambiguatePicker';


class Selfie extends React.Component {
  constructor() {
    super();

    this.state = {
      hasCameraPermission: null,
      type: Camera.Constants.Type.front,
      ratio: '16:9',
      styledImage: '',
    };

    this.camera = null;

    this.snap = this.snap.bind(this);
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  async snap() {
    if (this.camera) {
      console.log('Taking photo')
      this.props.navigation.navigate('LoadingScreen')
      const bigPhoto = await this.camera.takePictureAsync({ quality: 1 })
      const smallPhoto = await ImageManipulator.manipulate(
        bigPhoto.uri,
        [{ resize: { height: 800 } }],
        { compress: 0.8, base64: true }
      )
      try {
        const styledResponse = await axios.post(`${backEndAddress}/api/style-image`, {
          style: 'udnie',
          photo: smallPhoto.base64,
        })
        const styled64 = styledResponse.data
        this.props.navigation.navigate('StyledViewer', { styled64 })
      } catch (err) {
        this.props.navigation.dispatch(NavigationActions.back())
      }
    }
  }
// 'data:image/jpeg;base64,' + this.state.styledImage
  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera
            style={styles.ocrCamera}
            type={this.state.type}
            ratio={this.state.ratio}
            ref={ref => { this.camera = ref }}
          >
            <Text style={styles.ocrText}>
              Take a picture to have it styled
            </Text>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={styles.switchCameraButton}
                onPress={() => {
                  this.setState({
                    type: this.state.type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back,
                  })
                }}>
                <View style={styles.switchCameraBackground}>
                  <Image
                    style={styles.ocrButtonIcon}
                    source={require('../resources/icons/refresh-button.png')}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.ocrButton}
                onPress={this.snap}>
                <View style={styles.ocrButtonBackground}>
                  <Image
                    style={styles.ocrButtonIcon}
                    source={require('../resources/icons/photo-camera.png')}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      );
    }
  }
}

export default Selfie;
