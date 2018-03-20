import { AsyncStorage } from 'react-native'
import axios from 'axios'
import { backEndAddress } from '../config'

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
      if (uuid) {
        dispatch(stockUuid(uuid))
        return uuid
      } else {
        return null
      }
    })
    .catch(() => null)

export const setUuid = uuid =>
  dispatch => {
    AsyncStorage.setItem('uuid', uuid)
    .then(() => {
      dispatch(stockUuid(uuid))
    })
    .catch(err => console.log(`can't set AsyncStorage`, err))
  }

export const getFacebookIdFromStorage = () =>
dispatch =>
  AsyncStorage.getItem('facebookId')
  .then(facebookId => {
    if (facebookId) {
      dispatch(stockFacebookId(facebookId))
      return facebookId
    } else {
      return null
    }
  })
  .catch(() => null)

export const setFacebookId = facebookId =>
dispatch =>
  AsyncStorage.setItem('facebookId', facebookId)
  .then(() => dispatch(stockFacebookId(facebookId)))

export const getUserInfo = facebookId =>
  dispatch =>
    axios.get(`${backEndAddress}/api/users/${facebookId}`)
    .then(res => res.data)
    .then(info => dispatch(stockUserInfo(info)))

export const loginWithToken = token =>
  dispatch =>
    axios.post(`${backEndAddress}/auth/facebook`, { token })
    .then(res => res.data)
    .then(info => {
      dispatch(setUuid(info.uuid))
      dispatch(setFacebookId(info.facebookId))
      dispatch(stockUserInfo(info))
    })


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
