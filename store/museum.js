import axios from 'axios'
import { backEndAddress } from '../config'

const STOCK_MUSEUM = 'STOCK_MUSEUM'
const TOP_PIECES = 'TOP_PIECES'

const stockMuseum = museum => ({
  type: STOCK_MUSEUM,
  museum,
})

const topPieces = (pieces) => {
  return {
    type: TOP_PIECES,
    pieces
  }
}

export const getMuseumNearMe = (latitude, longitude) =>
  dispatch => {
    return axios.get(`${backEndAddress}/api/museums/location/?latitude=${latitude}&longitude=${longitude}`)
    .then(res => res.data)
    .then(museum => dispatch(stockMuseum(museum)))
  }

export function fetchTopPieces(museumId){
  return function thunk(dispatch){
    return axios.get(backEndAddress + `/api/museums/${museumId}/pieces`)
    .then(res => res.data)
    .then(pieces => {
      return dispatch(topPieces(pieces))
    })
    .catch(err => console.error('Fetching top pieces failed', err));
  }
}

const initialState = {
  museum: {},
  pieces: []
}

const museumReducer = (state = initialState, action) => {

  switch (action.type) {

    case STOCK_MUSEUM:
      return {
        ...state,
        museum: action.museum
      }
    case TOP_PIECES:
      return {
        ...state, 
        pieces: action.pieces
      }
    default:
    return state
  }
}

export default museumReducer
