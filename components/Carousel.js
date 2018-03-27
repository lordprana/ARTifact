import React, { Component } from 'react';
import { View, ScrollView, Image, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const height = width * 0.8;

class Carousel extends Component {
  render() {
      return (
        <View
          style={styles.scrollContainer}
        >
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
          >
            {/* {images.map(image => (
              <Image style={styles.image} source={image} />
            ))} */}
            <View style={styles.imageView}>
            <View style={styles.singleView} >
            <Image style={styles.image} source={require('../public/img/Whitney-Deck-View.jpg')}/>
            </View >
            <View style={styles.singleView}>
            <Image style={styles.image} source={require('../public/img/Whitney-Logo.jpg')}/>
            </View>
            <View style={styles.singleView}>
            <Image style={styles.image} source={require('../public/img/Whitney-Exhibition.jpg')}/>
            </View>
            <View style={styles.singleView}>
            <Image style={styles.image} source={require('../public/img/Whitney-Deck-View-2.jpg')}/>
            </View>
            <View style={styles.singleView}>
            <Image style={styles.image} source={require('../public/img/Whitney-Exterior.jpg')}/>
            </View>
            </View>
          </ScrollView>
        </View>
      );   
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