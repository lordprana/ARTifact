import React, { Component } from 'react';
import { View, ScrollView, Image, StyleSheet, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper'

const { width } = Dimensions.get('window');
const height = width * 0.7;

class Carousel extends Component {
  constructor() {
    super()
    this.state = {
      visibleSwiper: false
    }
  }

  componentDidMount() {
    setTimeout(() => { // This is used to fix react-native-swiper in android bug
      this.setState({ visibleSwiper: true });
    }, 0);
  }

  render() {
      return <View style={styles.scrollContainer}>
          { this.state.visibleSwiper &&
            <Swiper
              horizontal
              pagingEnabled={true}
              showsHorizontalScrollIndicator={false}
              autoplay={true}
              autoplayTimeout={7}
              loop={true}
              showsPagination={false}
            >
              <View style={styles.singleView}>
                <Image style={styles.image} source={require("../resources/images/Whitney-Logo.jpg")} />
              </View>
              <View style={styles.singleView}>
                <Image style={styles.image} source={require("../resources/images/Whitney-Deck-View.jpg")} />
              </View>
              <View style={styles.singleView}>
                <Image style={styles.image} source={require("../resources/images/Whitney-Exhibition.jpg")} />
              </View>
              {/* <View style={styles.singleView}>
                <Image style={styles.image} source={require("../resources/images/Whitney-Deck-View-2.jpg")} />
              </View> */}
              {/* <View style={styles.singleView}>
                <Image style={styles.image} source={require("../resources/images/Whitney-Exterior.jpg")} />
              </View> */}
            </Swiper>
          }
        </View>;
  }
}

const styles = StyleSheet.create({
  scrollContainer: {
    height,
    width
  },
  singleView: {
    paddingLeft: width*.05 ,
    paddingRight: width*.05,
    flex: 1,
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
    paddingRight: 10,
  },
});

export default Carousel;
