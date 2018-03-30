import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { getSavedPieces, stockPiece, getPosts } from '../store';
import styles from '../styles';
import { backEndAddress } from '../config';

const handlePiecePress = (stockPosts, stockPiece, piece, navigation) => () => {
  stockPosts(piece.posts);
  stockPiece(piece);
  navigation.dispatch(
    NavigationActions.reset(
      {
        index: 1,
        actions: [
          NavigationActions.navigate(
            {
              routeName: 'swiper'
            }
          ),
          NavigationActions.navigate(
            {
              routeName: 'AllPosts',
            }
          )
        ]
      })
  );
};

const Pieces = props => (
  <TouchableOpacity onPress={handlePiecePress(props.stockPosts, props.stockPiece, props.piece, props.navigation)}>
    <View style={styles.savedPiece}>
      <View style={styles.savedPieceSeparator}>
        <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/1/17/Rhinos_Chauvet_Cave.jpg' }} style={styles.savedPiecePic} />
        <View style={styles.savedPieceTextContainer}>
          <Text style={styles.savedPieceTitle}>{props.piece.name}</Text>
          <Text style={styles.savedPieceText}>Artist Name</Text>
          <Text style={styles.savedPieceText}>{props.piece.year}</Text>
        </View>
      </View>
      <Image source={require('../resources/icons/right-arrow.png')} style={styles.tempArrow} />
    </View>
  </TouchableOpacity>
);

class UserPage extends React.Component {
  constructor() {
    super();
    this.state = {
      recommendations: null
    };
  }

  componentDidMount() {
    axios.get(`${backEndAddress}/api/recommendations`)
    .then(res => res.data)
    .then(recommendations => this.setState({recommendations}))
    .catch(console.error.bind(console));
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={styles.userHeader}>
          <Text style={styles.userName}>{this.props.name}</Text>
          <Image source={{ uri: this.props.pictureUrl }} style={styles.profilePic} />
        </View>
        <ScrollView style={{flexGrow: 1}}>
          <Text style={styles.userPageSubtitle}>Recommended works</Text>
          {this.state.recommendations && this.state.recommendations.map(piece => (
            <Pieces
              key={piece.id}
              piece={piece}
              stockPosts={this.props.stockPosts}
              stockPiece={this.props.stockPiece}
              navigation={this.props.navigation} />
          ))}
          <Text style={styles.userPageSubtitle}>Saved works</Text>
          {this.props.savedPieces && this.props.savedPieces.map(piece => (
            <Pieces
              key={piece.id}
              piece={piece}
              stockPosts={this.props.stockPosts}
              stockPiece={this.props.stockPiece}
              navigation={this.props.navigation} />
          )
          )}
        </ScrollView>
      </View>
    );
  }
}

const mapState = state => ({
  name: state.user.name,
  pictureUrl: state.user.pictureUrl,
  savedPieces: state.user.pieces,
});
const mapDispatch = dispatch => ({
  getSavedPieces: () => dispatch(getSavedPieces()),
  stockPosts: posts => dispatch(getPosts(posts)),
  stockPiece: piece => dispatch(stockPiece(piece))
});

export default connect(mapState, mapDispatch)(UserPage);
