import React from 'react';
import Swiper from 'react-native-swiper';
import randomcolor from 'randomcolor';
import { View, Text } from 'react-native';
import MuseumPage from './MuseumPage';
import UserPage from './UserPage'
import OCR from './OCR';
class TitleText extends React.Component {

  render() {
    return (
      <Text style={{ fontSize: 48, color: 'white' }}>
        {this.props.label}
      </Text>
    )
  }
}

export default class FakeCam extends React.Component {

  viewStyle() { // delete when ready
    return {
      flex: 1,
      backgroundColor: randomcolor(),
      justifyContent: 'center',
      alignItems: 'center',
    }
  }
// pass in this.props.navigation.navigae thing to ocr but it probably has already.
  render() {
      return (
        <Swiper
          loop={false}
          showsPagination={true}
          index={1}>
          <View style={this.viewStyle()}>
            <MuseumPage />
          </View>
            <View >
              <OCR navigation={this.props.navigation} />
            </View>
          <UserPage />
        </Swiper>
      )
  }
}


