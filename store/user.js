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
  type: STOCK_UUID,
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
      console.log('uuid from storage:', uuid)
      dispatch(stockUuid(uuid))
    })

export const setUuid = uuid =>
  dispatch =>
    AsyncStorage.setItem('uuid', uuid)
    .then(() => dispatch(stockUuid(uuid)))

export const getFacebookIdFromStorage = () =>
dispatch =>
  AsyncStorage.getItem('facebookId')
  .then(facebookId => {
    console.log('fb id from storage:', facebookId)
    dispatch(stockFacebookId(facebookId))
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
        uuid: action.facebookId,
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
