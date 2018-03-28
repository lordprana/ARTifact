import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { getSavedPieces } from '../store/user';
import styles from '../styles';
import { backEndAddress } from '../config';

const Pieces = props => (
  <View style={styles.savedPiece}>
    <View style={styles.savedPieceSeparator}>
      <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/1/17/Rhinos_Chauvet_Cave.jpg' }} style={styles.savedPiecePic} />
      <View style={styles.savedPieceTextContainer}>
        <Text style={styles.savedPieceTitle}>{props.piece.name}</Text>
        <Text style={styles.savedPieceText}>Artist Name</Text>
        <Text style={styles.savedPieceText}>{props.piece.year}</Text>
      </View>
    </View>
    <TouchableOpacity style={{alignSelf: 'center'}}>
      <Image source={require('../resources/icons/right-arrow.png')} style={styles.tempArrow} />
    </TouchableOpacity>
  </View>
);

class UserPage extends React.Component {
  constructor() {
    super();
    this.state = {
      recommendations: null
    }
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
            <Pieces key={piece.id} piece={piece} />
          ))}
          <Text style={styles.userPageSubtitle}>Saved works</Text>
          {this.props.savedPieces && this.props.savedPieces.map(piece => (
            <Pieces key={piece.id} piece={piece} />
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
});

export default connect(mapState, mapDispatch)(UserPage);
