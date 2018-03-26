import React, { Component } from 'react';
import { connect } from 'react-redux';
import {View, ScrollView, StyleSheet, Text} from 'react-native'
import { getMuseumNearMe } from '../store/museum';
import { fetchTopPieces } from '../store/museum'
import CreatePost from './CreatePost'
import Carousel from './Carousel'
import AllPosts from './AllPosts';

class MuseumPage extends Component {
  constructor(props){
    super(props)
  }

componentDidMount(){
  this.props.fetchTopPieces(1)
}

  render() {
    return (
      <View style={styles.carouselContainer}>
        <ScrollView>
        <Carousel/>
          <View style={styles.museumView}>
            <CreatePost/>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  carouselContainer : {
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#ADD8E6'
  },
  postContainer: {
    padding: 8
  },
  museumView: {
    backgroundColor: 'cornsilk'
  }
})

mapStateToProps = state => ({
  pieces: state.museum.pieces
})

const mapDispatch = dispatch => ({
  getMuseumNearMe: (lat, long) => dispatch(getMuseumNearMe(lat, long)),
  fetchTopPieces: (museumId) => dispatch(fetchTopPieces(museumId))
})

export default connect(mapStateToProps, mapDispatch)(MuseumPage)
