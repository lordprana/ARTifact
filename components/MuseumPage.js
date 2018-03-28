import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, StyleSheet, Text, Image, TouchableOpacity } from 'react-native'
import { NavigationActions } from 'react-navigation';
import { getMuseumNearMe, fetchTopPieces, getPosts, stockPiece } from '../store';
import Carousel from './Carousel'

class MuseumPage extends Component {
  constructor(props){
    super(props)
    this.handlePiecePress = this.handlePiecePress.bind(this);
  }

  componentDidMount(){
    this.props.fetchTopPieces(this.props.museum.id)
  }

  handlePiecePress = (piece) => () => {
    this.props.stockPosts(piece.posts);
    delete piece.posts;
    this.props.stockPiece(piece);
    this.props.navigation.navigate('AllPosts');
  }

  get topPieces() {
    if (!this.props.pieces) return null
    return this.props.pieces.map(piece => (
      <TouchableOpacity key={piece.id} onPress={this.handlePiecePress(piece)}>
        <View  style={styles.postView}>
          <Text style={styles.pieceName}>{piece && piece.name}</Text>
          <View style={styles.imageAndContent}>
            <Image
              style={styles.image}
              source={{ uri: piece.pictureUrl }}
            />
            <Text style={styles.textContent}>
              { piece.posts && piece.posts.length && piece.posts[0].content.slice(0, 95) + " ..."}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    ));
  }

  render() {
    return (
      <View style={styles.masterView}>
      <View style={styles.carouselContainer}>
        <Carousel/>
        </View>
        <View style={styles.postsHeaderContainer}>
          <Text style={styles.postsHeader}>
            Most Active Pieces
          </Text>
        </View>
        <ScrollView>
          <View style={styles.postContainer}>
          {this.topPieces}
          </View>
        </ScrollView>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  masterView: {
    backgroundColor: 'cornsilk'
  },
  imageStyle: {
    maxHeight: 25,
    maxWidth: 40,
    flex:1
  },
  carouselContainer : {
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#085D00'
  },
  postContainer: {
    backgroundColor: 'cornsilk',
  },
  pieceName:{
    fontSize: 18,
    marginBottom: 6
  },
  imageAndContent: {
    flexDirection: 'row'
  },
  textContent: {
    fontSize: 15,
    marginLeft: 15,
    flex: 1
  },
  postView: {
    borderBottomWidth: 1,
    borderColor: 'black',
    margin: 5,
    padding: 10
  },
  postsHeaderContainer: {
    marginTop: 10,
    backgroundColor: 'cornsilk',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center'
  },
  postsHeader: {
    fontSize: 20,
  },
  image: {
    width: 75,
    height: 75,
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

mapStateToProps = state => ({
  pieces: state.museum.pieces,
  museum: state.museum.museum,
})

mapDispatchToProps = dispatch => ({
  getMuseumNearMe: (latitude, longitude) => dispatch(getMuseumNearMe(latitude, longitude)),
  fetchTopPieces: museumId => dispatch(fetchTopPieces(museumId)),
  stockPosts: posts => dispatch(getPosts(posts)),
  stockPiece: piece => dispatch(stockPiece(piece))
})


export default connect(mapStateToProps, mapDispatchToProps)(MuseumPage)
