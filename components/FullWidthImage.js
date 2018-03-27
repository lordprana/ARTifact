import React from 'react';
import { View, Image } from 'react-native';

export default class FullWidthImage extends React.Component {
  constructor() {
      super();

      this.state = {
          width: 0,
          height: 0
      };
  }

  _onLayout(event) {
      const containerWidth = event.nativeEvent.layout.width;

      if (this.props.ratio) {
          this.setState({
              width: containerWidth,
              height: containerWidth * this.props.ratio
          });
      } else {
          Image.getSize(this.props.source.uri, (width, height) => {
              this.setState({
                  width: containerWidth,
                  height: containerWidth * height / width
              });
          });
      }
  }

  render() {
      return (
          <View
            style={this.props.style}
            onLayout={this._onLayout.bind(this)}>
              <Image
                  source={this.props.source}
                  style={{
                      width: this.state.width,
                      height: this.state.height
                  }} />
          </View>
      );
  }
}
