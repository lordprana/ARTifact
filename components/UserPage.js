import React from 'react'
import { connect } from 'react-redux'
import { Text, View, Image, TouchableOpacity } from 'react-native'
import { getSavedPieces } from '../store/user'
import styles from '../styles';

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
)

const UserPage = props => {

  if (Object.keys(props).length < 3) return null
  return (
    <View>
      <View style={styles.userHeader}>
        <Text style={styles.userName}>{props.name}</Text>
        <Image source={{ uri: props.pictureUrl }} style={styles.profilePic} />
      </View>
      <Text style={styles.userPageSubtitle}>Recommnded works</Text>
      <Text style={styles.userPageSubtitle}>Saved works</Text>
      {props.savedPieces.map(piece => (
          <Pieces key={piece.id} piece={piece} />
        )
      )}
    </View>
  )
}

const mapState = state => ({
  name: state.user.name,
  pictureUrl: state.user.pictureUrl,
  savedPieces: state.user.pieces,
})
const mapDispatch = dispatch => ({
  getSavedPieces: () => dispatch(getSavedPieces()),
})

export default connect(mapState, mapDispatch)(UserPage)
