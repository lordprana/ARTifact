import React from 'react';

import { Text, View, TouchableOpacity, Picker, Modal, StatusBar, TouchableHighlight, ScrollView } from 'react-native';
import styles from '../styles';

export default class DisambiguatePicker extends React.Component {
  constructor(props) {
    super(props);
  }

  _onPress(piece) {
    return function() {
      alert('Pressed' + piece.name);
    }
  }

  render() {
    return (
      <ScrollView style={styles.disambiguateContainer}>
        <Text style={styles.disambiguateTitle}>Choose the piece</Text>
        { this.props.pieces.map(piece => (
          <TouchableOpacity onPress={this._onPress(piece)} >
            <View style={styles.disambiguateItem}>
              <Text
                style={styles.disambiguateText}
                numberOfLines={1}
                ellipsizeMode="tail">
                {piece.name} by {piece.artist.name}
               </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    )
  }
}
