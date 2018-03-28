import React, { Component } from 'react';
import { View, ScrollView, Image, StyleSheet, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper'

const { width } = Dimensions.get('window');
const height = width * 0.7;

class Carousel extends Component {
  render() {
      return <View style={styles.scrollContainer}>
          <Swiper 
          horizontal 
          pagingEnabled = {true}
          showsHorizontalScrollIndicator={false} 
          autoplay={true}
          autoplayTimeout= {7}
          loop={true}
          showsPagination={false}
          >
              <View style={styles.singleView}>
                <Image style={styles.image} source={require("../public/img/Whitney-Deck-View.jpg")} />
              </View>
              <View style={styles.singleView}>
                <Image style={styles.image} source={require("../public/img/Whitney-Logo.jpg")} />
              </View>
              <View style={styles.singleView}>
                <Image style={styles.image} source={require("../public/img/Whitney-Exhibition.jpg")} />
              </View>
              <View style={styles.singleView}>
                <Image style={styles.image} source={require("../public/img/Whitney-Deck-View-2.jpg")} />
              </View>
              <View style={styles.singleView}>
                <Image style={styles.image} source={require("../public/img/Whitney-Exterior.jpg")} />
              </View>
          </Swiper>
        </View>;   
  }
}

const styles = StyleSheet.create({
  scrollContainer: {
    height
  },
  singleView: {
    paddingLeft: width*.05 ,
    paddingRight: width*.05,
  },
  imageView: {
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: width*.9,
    height,
    borderWidth:3,
    borderColor:'black',
    paddingRight: 10
  },
});

export default Carousel;