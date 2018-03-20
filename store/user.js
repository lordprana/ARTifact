import { AsyncStorage } from 'react-native'
import axios from 'axios'

const STOCK_UUID = 'STOCK_UUID'
const STOCK_FACEBOOK_ID = 'STOCK_FACEBOOK_ID'
const STOCK_USER_INFO = 'STOCK_USER_INFO'

const stockUuid = uuid => ({
  type: STOCK_UUID,
  uuid,
})

const stockFacebookId = facebookId => ({
  type: STOCK_FACEBOOK_ID,
  facebookId,
})

export const stockUserInfo = info => ({
  type: STOCK_USER_INFO,
  info,
})

export const getUuidFromStorage = () =>
  dispatch =>
    AsyncStorage.getItem('uuid')
    .then(uuid => {
      console.log('got uuid from storage:', uuid)
      if (uuid) return dispatch(stockUuid(uuid))
    })

export const setUuid = uuid =>
  dispatch => {
    console.log('hello from set uuid!')
    AsyncStorage.setItem('uuid', uuid)
    .then(() => {
      console.log('about to dispatch...')
      dispatch(stockUuid(uuid))
    })
    .catch(err => console.log('something went wrong:', err))
    console.log('made it to bottom of function')
  }

export const getFacebookIdFromStorage = () =>
dispatch =>
  AsyncStorage.getItem('facebookId')
  .then(facebookId => {
    console.log('got fb id from storage:', facebookId)
    if (facebookId) return dispatch(stockFacebookId(facebookId))
  })

export const setFacebookId = facebookId =>
dispatch =>
  AsyncStorage.setItem('facebookId', facebookId)
  .then(() => dispatch(stockFacebookId(facebookId)))

export const getUserInfo = facebookId =>
  dispatch =>
    axios.get(`api/users/${facebookId}`)
    .then(info => dispatch(stockUserInfo(info)))


const initialState = {
  facebookId: null,
  uuid: null,
  name: null,
  email: null,
  pictureUrl: null,
}

const userReducer = (state = initialState, action) => {

  switch (action.type) {

    case STOCK_UUID:
      return {
        ...state,
        uuid: action.uuid,
      }

    case STOCK_FACEBOOK_ID:
      return {
        ...state,
        facebookId: action.facebookId,
      }

    case STOCK_USER_INFO:
      return {
        ...state,
        name: action.info.userName,
        email: action.info.email,
        pictureUrl: action.info.facebookPic,
      }

    default:
      return state
  }
}

export default userReducer
