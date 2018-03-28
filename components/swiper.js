import React from 'react';
import Swiper from 'react-native-swiper';
import { View } from 'react-native';
import MuseumPage from './MuseumPage';
import UserPage from './UserPage'
import OCR from './OCR';

export default class Navigation extends React.Component {

  render() {
      return (
        <Swiper
          loop={false}
          showsPagination={true}
          index={1}>
          <View style={{flex: 1}}>
            <MuseumPage navigation={this.props.navigation} />
          </View>
            <View >
              <OCR navigation={this.props.navigation} />
            </View>
          <UserPage navigation={this.props.navigation} />
        </Swiper>
      )
  }
}


