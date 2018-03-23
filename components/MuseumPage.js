import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getMuseumNearMe } from '../store/museum'
import AllPosts from './AllPosts';

class MuseumPage extends Component {

  // componentDidMount() {

  // }

  render() {
    return (
      <View>
      <CreatePost/>
      <AllPosts/>
      </View>
    )
  }
}

const mapDispatch = dispatch => ({
  getMuseumNearMe: (lat, long) => dispatch(getMuseumNearMe(lat, long))
})

export default connect(null, mapDispatch)(MuseumPage)
