import React from 'react';

import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import styles from '../styles';
import { stockPiece, getPosts } from '../store';

class DisambiguatePicker extends React.Component {
  constructor(props) {
    super(props);

    this._onPress = this._onPress.bind(this);
  }

  _onPress(piece) {
    return function() {
      console.log(this);
      this.props.stockPosts(piece.posts);
      delete piece.posts;
      this.props.stockPiece(piece);
      // navigate to forum
    }.bind(this);
  }

  render() {
    return (
      <ScrollView style={styles.disambiguateContainer}>
        <Text style={styles.disambiguateTitle}>Choose a piece</Text>
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

const mapDispatch = dispatch => ({
  stockPiece: piece => dispatch(stockPiece(piece)),
  stockPosts: posts => dispatch(getPosts(posts))
});

export default connect(null, mapDispatch)(DisambiguatePicker);
