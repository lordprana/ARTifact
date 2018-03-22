import React from 'react';

import { Text, View, TouchableOpacity } from 'react-native';
import { Camera, Permissions } from 'expo';
import axios from 'axios';
import { connect } from 'react-redux';
import styles from '../styles';
import { backEndAddress } from '../config';
import { stockPiece, getPosts } from '../store';
import LoadingScreen from './LoadingScreen';


class OCR extends React.Component {
  constructor() {
    super();

    this.state = {
      hasCameraPermission: null,
      type: Camera.Constants.Type.back,
      loading: false
    };

    this.camera = null;

    this.snap = this.snap.bind(this);
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  snap() {
    if (this.camera) {
      console.log('Taking photo');
      this.setState({loading: true});
      this.camera.takePictureAsync({ base64: true, quality: 0.1 })
        .then(photo => {
          console.log('Took photo');
          // TODO Add museumId at query parameter
          return axios.post(`${backEndAddress}/api/identify-piece-from-plaque-image`, {
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
          });
        })
        .then(res => {
          console.log(res.data);
          this.setState({loading: false});
          if (res.data.length > 1){
            // TODO Add navigation to disambiguatepicker here
          } else if (res.data.length === 1) {
            const piece = res.data[0];
            this.props.stockPosts(piece.posts);
            delete piece.posts;
            this.props.stockPiece(piece);
            // TODO Add navigation to Piece forum here
          } else {
            // TODO Navigate to NoneIdentified component
          }
        })
        .catch(console.error.bind(console));
    }
}

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera style={styles.ocrCamera} type={this.state.type} ref={ref => {this.camera = ref;}} >
            <Text>
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
          {
            this.state.loading && <LoadingScreen />
          }
        </View>
      );
    }
  }
}

const mapDispatch = dispatch => ({
  stockPiece: piece => dispatch(stockPiece(piece)),
  stockPosts: posts => dispatch(getPosts(posts))
});

export default connect(null, mapDispatch)(OCR);
