import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getMuseumNearMe } from '../store/museum'

class MuseumPage extends Component {

  // componentDidMount() {

  // }

  render() {
    return (
      null
    )
  }
}

const mapDispatch = dispatch => ({
  getMuseumNearMe: (lat, long) => dispatch(getMuseumNearMe(lat, long))
})

export default connect(null, mapDispatch)(MuseumPage)
