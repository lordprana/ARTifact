import React, { Component } from 'react';
import { connect } from 'react-redux';
import {View, ScrollView, StyleSheet, Text, Image} from 'react-native'
import { getMuseumNearMe } from '../store/museum';
import { fetchTopPieces } from '../store/museum'
import Carousel from './Carousel'

class MuseumPage extends Component {
  constructor(props){
    super(props)
  }

  componentDidMount(){
    this.props.fetchTopPieces(1)
  }

  get topPieces() {
    if (!this.props.pieces) return null
    return this.props.pieces.map(piece =>
      <View key={piece.id} style={styles.postView}>
        <Text style={styles.pieceName}>{piece && piece.name}</Text>
        <View style={styles.imageAndContent}>
        <Image style={styles.image} source = {{uri: (piece.pictureUrl)}}/>
        <Text style={styles.textContent}>{piece.posts[0].content.slice(0, 95) + ' ...'}</Text>
        </View>
      </View>)
  }
//   <View key={piece.id} style={styles.postView}>
//   <Text style={styles.textContent}>{piece.posts[0] && piece.posts[0].content}</Text>
// </View>)

  render() {
    //console.log(this.props.pieces)
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
    fontFamily: 'Georgia'
  },
  image: {
    width: 75,
    height: 75,
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center'
    // borderWidth:3,
    // borderColor:'black',
    // paddingRight: 10
  }
})

mapStateToProps = state => ({
  pieces: state.museum.pieces,
  museum: state.museum,
})


export default connect(mapStateToProps, {getMuseumNearMe, fetchTopPieces})(MuseumPage)
