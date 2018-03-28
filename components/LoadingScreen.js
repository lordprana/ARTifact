import React from 'react';
import { View, Animated, Text } from 'react-native';
import styles from '../styles';

export default class LoadingScreen extends React.Component {
  constructor() {
    super();

    this.images = [
      require('../resources/images/monalisa.jpg'),
      require('../resources/images/starrynight.jpg'),
      require('../resources/images/thepersistenceofmemory.jpg'),
      require('../resources/images/americangothic.jpg'),
      require('../resources/images/thescream.jpg')
    ];

    const randomStart = Math.floor(Math.random() * (this.images.length));

    const animatedValues = this.images.map((_, i) => {
      if (i === randomStart) return new Animated.Value(1);
      else return new Animated.Value(0);
    });

    this.state = {
      animatedValues,
      activeImage: randomStart
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({activeImage:
        (this.state.activeImage + 1) % this.images.length});

      const animations = [];
      this.images.forEach((_, i) => {
        if (this.state.activeImage === i) {
          animations.push(Animated.timing(
            this.state.animatedValues[i],
            {
              toValue: 1,
              duration: 1000
            }
          ));
        } else {
          animations.push(Animated.timing(
            this.state.animatedValues[i],
            {
              toValue: 0,
              duration: 1000
            }
          ));
        }
      });
      Animated.parallel(animations).start();
    }, 4000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <View style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
        }}>
        {this.images.map((image, i) => (
          <Animated.Image
            key={image}
            source={image}
            style={[styles.loadingImage, {opacity: this.state.animatedValues[i]}]} />
        ))}
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }
}
