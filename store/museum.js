import axios from 'axios'
import { backEndAddress } from '../config'

const STOCK_MUSEUM = 'STOCK_MUSEUM'

const stockMuseum = museum => ({
  type: STOCK_MUSEUM,
  museum,
})

export const getMuseumNearMe = (lat, long) =>
  dispatch =>
    axios.get(`${backEndAddress}/api/museums/location/?lat=${lat}&long=${long}`)
    .then(museum => dispatch(stockMuseum(museum)))


const initialState = {
  museum: {},
}

const museumReducer = (state = initialState, action) => {

  switch (action.type) {

    case STOCK_MUSEUM:
      return action.museum

    default:
    return state
  }
}

export default museumReducer
