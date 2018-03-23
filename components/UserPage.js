import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, View, Image, FlatList } from 'react-native'
import { getSavedPieces } from '../store/user'

class UserPage extends Component {

  componentDidMount() {
    this.props.getSavedPieces()
  }

  render() {
    return (
      <View>
        <Text>{this.props.name}</Text>
        <Image source={{ uri: this.props.pictureUrl }} />
        <Text>Recommnded works</Text>
        <Text>Saved works</Text>
        {this.props.savedPieces.map(piece => (
            <View key={piece.id}>
              <Text>{piece.name}</Text>
              <Text>{piece.year}</Text>
              <Text>{piece.description}</Text>
            </View>
          )
        )}
      </View>
    )
  }
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
