import React from 'react';

import { Text, View, TouchableOpacity } from 'react-native';
import { Camera, Permissions } from 'expo';
import axios from 'axios';
import styles from '../styles';


export default class CameraExample extends React.Component {
  constructor() {
    super()

    this.state = {
      hasCameraPermission: null,
      type: Camera.Constants.Type.back,
    };

    this.camera = null;

    this.snap = this.snap.bind(this);
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  async snap() {
  console.log("Snapping");
  console.log(this.camera);
  if (this.camera) {
    console.log("Taking picture");
    let now = new Date()
    this.camera.takePictureAsync({base64: true, quality: 0.1})
    .then(photo => {
      console.log("Took a picture");
      console.log(photo);
      return axios.post('http://192.168.1.5:8080/api/identify-piece-from-plaque-image', {
        requests: [
          {
            image: {
              content: photo.base64
            },
            features: [
              {
                type: 'TEXT_DETECTION'
              }
            ]
          }
        ]
      })
    })
    .then(res => {
      console.log('Time', new Date() - now);
      console.log(res.data)
    })
    .catch(console.error.bind(console));
  }
};

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera style={{ flex: 1 }} type={this.state.type} ref={ref => {this.camera = ref;}} >
            <Text style={styles.ocrText}>
              Take a picture of the art plaque to join the conversation about the piece
            </Text>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={this.snap}>
                <Text
                  style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                  {' '}Photo{' '}
                </Text>
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      );
    }
  }
}


